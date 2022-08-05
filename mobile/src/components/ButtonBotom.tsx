import React from 'react';
import { Button, Icon, IconButton, IIconButtonProps } from 'native-base';
import { IconProps, Plus } from 'phosphor-react-native';
 
interface Props {
  onPress: () => void;
  icon: React.ElementType<IconProps>;
}
export function ButtonBottom({ onPress, icon: IconI }: Props) {
  return (
        <IconButton 
          onPress={onPress}
          icon={<Icon as={<IconI size={26} weight="bold" />} />}
          bg="cyan.400"
         />
  );
}