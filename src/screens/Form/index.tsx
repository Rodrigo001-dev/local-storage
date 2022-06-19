import React from 'react';
import { KeyboardAvoidingView, Platform, ScrollView, View } from 'react-native';
import Toast from 'react-native-toast-message';
import uuid from 'react-native-uuid';
import AsyncStorage from '@react-native-async-storage/async-storage';
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

  async function handleNew({ service_name, email_or_username, password }: FormData) {
    try {
      const id = uuid.v4();

      const newData = {
        id,
        name: service_name,
        user: email_or_username,
        password
      };

      // buscando tudo que existe antes de salvar
      const response = await AsyncStorage.getItem("@localstorage:passwords");
      const previousData = response ? JSON.parse(response) : [];

      // criando um novo objeto com o que tinha antes e o novo registro, porque
      // se eu não fizer isso o AsyncStorage vai substituir o novo registro no
      // lugar do antigo
      const data = [...previousData, newData];

      // o AsyncStorage não é um banco de dados relacional, ele é um banco de dados
      // simples que armazena as informações no formato de texto 
      // o AsyncStorage recebe um parâmetro chamado de chave e outro de valor
      // a chave(@localstorage:passwords) está seguindo um padrão porque dentro do
      // celular do usuário pode ter outras aplicações que utilizam o armazenamento
      // local, esse padrão(estratégia) para diferenciar as coleções, aquilo que é
      // armazenado e mantido por essa aplicação 
      // await AsyncStorage.setItem("@localstorage:passwords", JSON.stringify(newData));
      await AsyncStorage.setItem("@localstorage:passwords", JSON.stringify(data));
      Toast.show({
        type: "success",
        text1: "Cadastrado com sucesso!"
      });
    } catch (error) {
      console.log(error);
      
      Toast.show({
        type: "error",
        text1: "Não foi possível cadastrar."
      });
    }
  };

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
              onPress={handleSubmit(handleNew)}
            />
          </View>
        </ScrollView>
      </View>
    </KeyboardAvoidingView >
  );
}