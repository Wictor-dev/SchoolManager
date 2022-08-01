import React from 'react';
import { Button, Icon, IconButton, IIconButtonProps } from 'native-base';
import { Plus } from 'phosphor-react-native';
 
interface Props extends IIconButtonProps {
  onPress: () => void;
}
export function ButtonBottom({ onPress, ...rest}: Props) {
  return (
        <IconButton 
          onPress={onPress}
          icon={<Icon as={<Plus size={26} weight="bold" />} />}
          bg="cyan.400"
          {...rest}
         />
  );
}