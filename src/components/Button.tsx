import React from 'react';
import { VStack, Button as NativeBaseButton, Text, IButtonProps } from 'native-base';

interface Props extends IButtonProps {
    title: string;
    light?: boolean;
}
export function Button({title, light = false, ...rest}: Props) {
  return (
    <NativeBaseButton alignItems="center" {...rest} >
        <Text color={light ? 'white': 'black'}>{title}</Text>
    </NativeBaseButton>
  );
}