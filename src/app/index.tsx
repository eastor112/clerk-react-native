import { Text, View, StyleSheet, Pressable } from 'react-native';
import { Link } from 'expo-router';
import { useUser } from '@clerk/clerk-expo';

export default function IndexScreen() {
  const { user } = useUser();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        Bienvenido {user?.fullName || 'desconocido'}
      </Text>

      <Link href='/sign-in' asChild>
        <Pressable style={styles.button}>
          <Text style={styles.buttonText}>Iniciar sesión</Text>
        </Pressable>
      </Link>

      <Link href='/sign-up' asChild>
        <Pressable style={{ ...styles.button, ...styles.outlineButton }}>
          <Text style={{ ...styles.buttonText, ...styles.outlineButtonText }}>
            Crear cuenta
          </Text>
        </Pressable>
      </Link>

      <Link href='/(protected)' asChild>
        <Pressable style={{ ...styles.button, ...styles.outlineButton }}>
          <Text style={{ ...styles.buttonText, ...styles.outlineButtonText }}>
            Go to home
          </Text>
        </Pressable>
      </Link>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#f4f6fc',
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 40,
    color: '#333',
  },
  button: {
    backgroundColor: '#406ea6',
    paddingVertical: 14,
    paddingHorizontal: 40,
    borderRadius: 10,
    marginBottom: 16,
    width: '80%',
    alignItems: 'center',
  },
  outlineButton: {
    backgroundColor: 'transparent',
    borderWidth: 2,
    borderColor: '#406ea6',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  outlineButtonText: {
    color: '#406ea6',
  },
});
