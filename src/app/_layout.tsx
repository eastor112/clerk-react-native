import React from 'react';
import { Stack } from 'expo-router';
import { ClerkProvider } from '@clerk/clerk-expo';
import { tokenCache } from '@clerk/clerk-expo/token-cache';
import { TamaguiProvider, createTamagui } from '@tamagui/core';
import { defaultConfig } from '@tamagui/config/v4';

const config = createTamagui(defaultConfig);
type Conf = typeof config;

declare module '@tamagui/core' {
  interface TamaguiCustomConfig extends Conf {}
}

const RootLayout = () => {
  return (
    <TamaguiProvider config={config}>
      <ClerkProvider tokenCache={tokenCache}>
        <Stack />
      </ClerkProvider>
    </TamaguiProvider>
  );
};

export default RootLayout;
