import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableWithoutFeedback,
} from 'react-native';
import React from 'react';
import {useNavigation} from '@react-navigation/native';

export default function MovieCard(props: any) {
  const {movieCard} = props;
  const navigation = useNavigation();

  const goMovie = () => {
    navigation.navigate('details', {id: movieCard.id});
  };

  return (
    <TouchableWithoutFeedback onPress={goMovie}>
      <View style={style.card}>
        <View style={style.spacing}>
          <View style={style.bgStyle}>
            <Text style={style.title}>{movieCard.title}</Text>
            <Image source={{uri: movieCard.poster_path}} style={style.image} />
          </View>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
}

const style = StyleSheet.create({
  card: {
    flex: 1,
    height: 250,
    marginBottom: 5,
  },
  spacing: {flex: 1, padding: 5},
  bgStyle: {
    backgroundColor: '#c92c2d',
    borderRadius: 5,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    position: 'relative',
    bottom: 3,
    width: 150,
    height: 150,
    borderRadius: 10,
    marginBottom: 3,
  },
  title: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 15,
    paddingTop: 10,
    paddingLeft: 5,
    textTransform: 'capitalize',
    marginBottom: 7,
  },
  homepage: {color: 'blue', fontWeight: 'bold'},
  overview: {color: 'orange', fontWeight: 'bold', fontSize: 13},
});
