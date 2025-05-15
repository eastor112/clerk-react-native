import React from 'react';
import { Redirect, Slot } from 'expo-router';
import { useAuth } from '@clerk/clerk-expo';

const ProtectedLayout = () => {
  const { isSignedIn } = useAuth();

  if (!isSignedIn) {
    return <Redirect href={'/sign-in'} />;
  }

  return <Slot />;
};

export default ProtectedLayout;
