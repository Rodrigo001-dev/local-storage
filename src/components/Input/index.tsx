import { Text, TextInput, TextInputProps, View } from 'react-native';
import { Control, Controller, FieldError } from 'react-hook-form';

import { styles } from './styles';

export type Props = TextInputProps & {
  label: string;
}

export function Input({ label, ...rest }: Props) {
  return (
    <View style={styles.container}>
      <Text style={styles.label}>
        {label}
      </Text>

      <TextInput style={styles.input} {...rest} />
    </View>
  );
}