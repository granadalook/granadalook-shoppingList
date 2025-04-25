import React from 'react';
import {View, Text, Button} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {logout} from '../redux/slices/userSlice';
import {RootState} from '../redux/store';

export default function HomeScreen() {
  const dispatch = useDispatch();
  const user = useSelector((state: RootState) => state.user.user);

  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <Text>Hola {user?.name}</Text>
      <Button title="Cerrar sesión" onPress={() => dispatch(logout())} />
    </View>
  );
}
