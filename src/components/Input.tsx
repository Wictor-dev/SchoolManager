import React from 'react';
import { Box, VStack, Input as NativeBaseInput, IInputProps } from 'native-base';

interface Props extends IInputProps {
    placeholder: string;
}
export function Input({placeholder, ...rest}: Props) {
  return (
    <Box>
        <NativeBaseInput 
            fontSize="lg"
            placeholder={placeholder}
            {...rest}
        />
    </Box>
  );
}