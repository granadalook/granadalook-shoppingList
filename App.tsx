import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';

import Toast from 'react-native-toast-message';
import {HomeScreen, LoginScreen} from './src/screens';
import { Provider } from 'react-redux';
import { store } from './src/store';

const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen name="Home" component={HomeScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}

const RootApp = () => {
  return (
    <>
      <App />
      <Toast />
    </>
  );
};

export default RootApp;
