import React from 'react';
import { HomeContainer } from '../components/organisms/HomeContainer';
import { useNavigation } from '@react-navigation/native';

export const HomeScreen = () => {
  const navigation = useNavigation();
  return <HomeContainer navigation={navigation} />;
};