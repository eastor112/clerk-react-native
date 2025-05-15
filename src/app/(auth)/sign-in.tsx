import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TextInput, Pressable } from 'react-native';
import { useForm, Controller } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Link, useRouter } from 'expo-router';
import { useSignIn } from '@clerk/clerk-expo';
import { useUserStore } from '../../store/auth';

const schema = z.object({
  email: z.string().email('Email inválido'),
  password: z.string().min(6, 'La contraseña debe tener al menos 6 caracteres'),
});

type FormData = z.infer<typeof schema>;

export default function App() {
  const { control, handleSubmit } = useForm<FormData>({
    resolver: zodResolver(schema),
  });
  const { signIn, setActive, isLoaded } = useSignIn();
  const router = useRouter();

  const onSubmit = async (data: FormData) => {
    if (!isLoaded) return;

    try {
      const signInAttempt = await signIn.create({
        identifier: data.email,
        password: data.password,
      });

      if (signInAttempt.status === 'complete') {
        await setActive({ session: signInAttempt.createdSessionId });
        router.replace('/(protected)');
      } else {
        console.error(JSON.stringify(signInAttempt, null, 2));
      }
    } catch (err) {
      console.error(JSON.stringify(err, null, 2));
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Iniciar sesión</Text>
      <StatusBar style='auto' />

      <Controller
        control={control}
        name='email'
        render={({ field: { onChange, value }, fieldState: { error } }) => (
          <>
            <TextInput
              style={styles.input}
              placeholder='Email'
              onChangeText={onChange}
              value={value}
              autoCapitalize='none'
              keyboardType='email-address'
            />
            {error && <Text style={styles.error}>{error.message}</Text>}
          </>
        )}
      />

      <Controller
        control={control}
        name='password'
        render={({ field: { onChange, value }, fieldState: { error } }) => (
          <>
            <TextInput
              style={styles.input}
              placeholder='Password'
              secureTextEntry
              onChangeText={onChange}
              value={value}
            />
            {error && <Text style={styles.error}>{error.message}</Text>}
          </>
        )}
      />

      <Pressable style={styles.button} onPress={handleSubmit(onSubmit)}>
        <Text style={styles.text}>Sign in</Text>
      </Pressable>

      <View style={styles.linkContainer}>
        <Text style={styles.linkText}>¿No tienes cuenta? </Text>
        <Link href='/sign-up'>
          <Text style={styles.link}>Regístrate</Text>
        </Link>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 30,
  },
  input: {
    height: 40,
    marginTop: 12,
    borderWidth: 1,
    borderColor: '#DDD',
    padding: 10,
    width: '80%',
  },
  button: {
    backgroundColor: '#406ea6',
    padding: 10,
    borderRadius: 5,
    marginTop: 20,
    width: '80%',
    alignItems: 'center',
  },
  text: {
    color: 'white',
    fontWeight: 'bold',
  },
  error: {
    color: 'red',
    marginTop: 4,
    marginBottom: 4,
    fontSize: 12,
    alignSelf: 'flex-start',
    marginLeft: '10%',
  },
  linkContainer: {
    flexDirection: 'row',
    marginTop: 20,
  },
  linkText: {
    fontSize: 14,
    color: '#333',
  },
  link: {
    fontSize: 14,
    color: '#406ea6',
    fontWeight: '600',
  },
});
