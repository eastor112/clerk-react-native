import { View, Text, StyleSheet, Pressable } from 'react-native';
import React from 'react';
import { useRouter } from 'expo-router';
import { useAuth, useClerk } from '@clerk/clerk-expo';
import resources from '../../services/resourcesService';

const Home = () => {
  const router = useRouter();
  const { signOut, user } = useClerk();
  const { getToken } = useAuth();

  const handleSignOut = async () => {
    try {
      await signOut();
      router.push('/sign-in');
    } catch (err) {
      console.error(JSON.stringify(err, null, 2));
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Inicio</Text>
      <Text style={styles.subtitle}>
        Bienvenido a tu espacio personal {user?.emailAddresses[0].emailAddress}{' '}
      </Text>

      <Pressable style={styles.button} onPress={() => router.push('/profile')}>
        <Text style={styles.buttonText}>Perfil</Text>
      </Pressable>

      <Pressable style={styles.button} onPress={() => router.push('/settings')}>
        <Text style={styles.buttonText}>Configuración</Text>
      </Pressable>

      <Pressable
        style={styles.button}
        onPress={async () => {
          const token = await getToken();

          if (token) {
            resources.testBase(token);
          }
        }}
      >
        <Text style={styles.buttonText}>Test API</Text>
      </Pressable>

      <Pressable style={styles.button} onPress={handleSignOut}>
        <Text style={styles.buttonText}>Sign out</Text>
      </Pressable>
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f4f6fc',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#2c3e50',
  },
  subtitle: {
    fontSize: 16,
    marginBottom: 24,
    color: '#7f8c8d',
    textAlign: 'center',
  },
  button: {
    backgroundColor: '#406ea6',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    marginTop: 10,
    width: '80%',
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  },
});
