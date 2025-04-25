import React from 'react';
import {Image} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import MoviesNavigation from './MoviesNavigation';
import HomeNavigation from './HomeNavigation';

const Tab = createBottomTabNavigator();
export default function NavigationFuntion() {
  return (
    <Tab.Navigator>
      <Tab.Screen
        name="Movies"
        component={MoviesNavigation}
        options={{
          tabBarLabel: '',
          tabBarIcon: () => iconImagePlay(),
        }}
      />
      <Tab.Screen
        name="Home"
        component={HomeNavigation}
        options={{
          tabBarLabel: '',
          tabBarIcon: () => iconImageMovie(),
        }}
      />
    </Tab.Navigator>
  );
}

function iconImagePlay() {
  return (
    <Image
      source={require('../assets/icon/Hopstarter-3d-Cartoon-Vol3-Windows-Movie-Maker.48.png')}
    />
  );
}

function iconImageMovie() {
  return (
    <Image
      source={require('../assets/icon/Hopstarter-Button-Button-Play.48.png')}
    />
  );
}
