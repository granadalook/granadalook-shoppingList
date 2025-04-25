import {Text, StyleSheet, View, Image} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import React from 'react';

export default function Home() {
  return (
    <SafeAreaView>
      <View style={style.container}>
        <Text style={style.title}>Welcome to MovieApp</Text>
        <Text style={style.description}>
          This application will provide information about the most popular
          movies of the moment
        </Text>
        <Image
          source={{
            uri: 'https://cdn.dribbble.com/users/2264632/screenshots/6708631/final.gif',
          }}
          style={style.image}
        />

        <Text style={style.enjoy}>Enjoy it</Text>
      </View>
    </SafeAreaView>
  );
}

const style = StyleSheet.create({
  container: {
    justifyContent: 'space-evenly',
    height: '100%',
    backgroundColor: '#c92c2d',
    alignItems: 'center',
  },
  title: {
    color: 'black',
    fontWeight: 'bold',
    fontSize: 50,
    fontStyle: 'italic',
  },
  description: {
    color: 'black',
    fontWeight: '700',
    fontSize: 25,
  },
  enjoy: {color: 'black', fontWeight: '700', fontSize: 25},
  image: {
    bottom: 3,
    width: 150,
    height: 150,
    borderRadius: 10,
    marginBottom: 3,
  },
});
