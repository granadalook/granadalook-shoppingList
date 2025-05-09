
import React from 'react';
import { LoginContainer } from '../components/organisms/LoginContainer';
import { useNavigation } from '@react-navigation/native';

export const LoginScreen = () => {
  const navigation = useNavigation();
  return <LoginContainer navigation={navigation} />;
};