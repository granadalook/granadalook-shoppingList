import React from 'react';
import { ListContainer } from '../components/organisms/ListDetailScreen';

export const ListScreen = ({ route, navigation }: any) => {
  return <ListContainer route={route} navigation={navigation} />;
};