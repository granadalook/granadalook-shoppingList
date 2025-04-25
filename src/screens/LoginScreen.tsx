import React from 'react';
import {View, Button, Text} from 'react-native';
import {useDispatch} from 'react-redux';
import {login} from '../redux/slices/userSlice';

export default function LoginScreen() {
  const dispatch = useDispatch();

  const handleLogin = () => {
    dispatch(login({name: 'John Doe', email: 'john@example.com'}));
  };

  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <Text>Bienvenido a la app de compras</Text>
      <Button title="Iniciar sesión" onPress={handleLogin} />
    </View>
  );
}
