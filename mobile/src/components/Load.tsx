import React from 'react';
import { VStack } from 'native-base';
import { ActivityIndicator } from 'react-native';
export function Load() {
  return (
    <VStack flex={1} h="100%" pt={12}>
        <ActivityIndicator color="gray" size={60} />
    </VStack>
  );
}