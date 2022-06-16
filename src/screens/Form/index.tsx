import React from 'react';
import { KeyboardAvoidingView, Platform, ScrollView, View } from 'react-native';
import Toast from 'react-native-toast-message';
import uuid from 'react-native-uuid';
import { useForm } from 'react-hook-form';

import { styles } from './styles';

import { ControlledInput } from '../../components/ControlledInput';
import { Button } from '../../components/Button';
import { HeaderForm } from '../../components/HeaderForm';

type FormData = {
  service_name: string;
  email_or_username: string;
  password: string;
};

export function Form() {
  const { control, handleSubmit, formState: { errors } } = useForm<FormData>();

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
    >
      <View style={styles.content}>
        <ScrollView>

          <HeaderForm />

          <View style={styles.form}>
            <ControlledInput
              name='service_name'
              control={control}
              label="Nome do serviço"
              error={errors.service_name}
            />
            <ControlledInput
              name='email_or_username'
              control={control}
              label="E-mail ou usuário"
              autoCapitalize="none"
              error={errors.email_or_username}
            />
            <ControlledInput
              name='password'
              control={control}
              label="Senha"
              secureTextEntry
              error={errors.password}
            />
          </View>

          <View style={styles.footer}>
            <Button
              title="Salvar"
            />
          </View>
        </ScrollView>
      </View>
    </KeyboardAvoidingView >
  );
}