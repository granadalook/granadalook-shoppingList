import {View, Text, StyleSheet} from 'react-native';
import * as React from 'react';

export default function description(props: any) {
  const {overview, tagline, date, time} = props;
  return (
    <View style={styles.content}>
      <Text style={styles.date}>Release date : {date}</Text>
      <Text style={styles.date}>Duration : {time} Minutes</Text>
      <Text style={styles.tagline}>Slogan : {tagline}</Text>
      <Text style={styles.overview}>Synopsis : {overview}</Text>
    </View>
  );
}
const styles = StyleSheet.create({
  content: {
    paddingHorizontal: 30,
  },
  tagline: {fontWeight: 'bold', color: 'black', fontSize: 17},
  overview: {fontWeight: '900', color: 'black', fontSize: 15},
  date: {fontWeight: '700', color: 'black', fontSize: 15},
});
