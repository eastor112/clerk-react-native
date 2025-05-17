import React from 'react';
import { Stack } from 'expo-router';
import { Platform, Text } from 'react-native';
import { TamaguiProvider, createTamagui } from '@tamagui/core';
import { defaultConfig } from '@tamagui/config/v4';

const config = createTamagui(defaultConfig);
type Conf = typeof config;

declare module '@tamagui/core' {
  interface TamaguiCustomConfig extends Conf { }
}

const ClerkProvider = Platform.OS === 'web'
  ? require('@clerk/clerk-react').ClerkProvider
  : require('@clerk/clerk-expo').ClerkProvider;

const clerkProps = Platform.OS === 'web'
  ? { publishableKey: process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY, afterSignOutUrl: "/" }
  : { tokenCache: require('@clerk/clerk-expo/token-cache').tokenCache };

const RootLayout = () => {
  return (
    <TamaguiProvider config={config}>
      <ClerkProvider {...clerkProps}>
        <Stack />
      </ClerkProvider>
    </TamaguiProvider>
  );
};

export default RootLayout;
