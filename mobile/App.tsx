import { NativeBaseProvider } from 'native-base';
import React, { useEffect } from 'react';
import { Alert } from 'react-native';
import { Home } from './src/screens/Home';


export default function App() {

  return (
    <NativeBaseProvider>
      <Home />
    </NativeBaseProvider>
  );
}

