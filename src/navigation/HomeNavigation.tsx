import {createStackNavigator} from '@react-navigation/stack';
import HomeScreen from '../screens/Home';
import React from 'react';
const Stack = createStackNavigator();
export default function HomeNavigation() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Home"
        component={HomeScreen}
        options={{title: 'WELCOME', headerTransparent: true}}
      />
    </Stack.Navigator>
  );
}
