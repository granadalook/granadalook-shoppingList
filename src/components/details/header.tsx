import {StyleSheet, View, Text, Image} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import React from 'react';
import {environment} from '../../environments/environments';

export default function header(props: any) {

  const {title, imagebg, lenguage} = props;
  return (
    <>
      <View style={styles.bgcolor} />
      <SafeAreaView style={styles.content}>
        <View style={styles.contentTitle}>
          <Text style={styles.title}>{title}</Text>
        </View>
        <View style={styles.contenImg}>
          <Image
            source={{uri: `${environment.IMAGE}${imagebg}`}}
            style={styles.Image}
          />
        </View>
        <View style={styles.contentTitle}>
          <Text style={styles.lenguage}>Original language = {lenguage}</Text>
        </View>
      </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({
  bgcolor: {
    width: '100%',
    height: 400,
    position: 'absolute',
    backgroundColor: '#c31e1f',
    borderBottomEndRadius: 300,
    borderBottomLeftRadius: 300,
    transform: [{scaleX: 2}],
  },
  contenImg: {flex: 1, justifyContent: 'center', alignItems: 'center', top: 30},
  Image: {width: 250, height: 250, borderRadius: 10},
  content: {marginHorizontal: 30, marginTop: 30},
  contentTitle: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 40,
  },
  title: {fontWeight: 'bold', color: '#FFF', fontSize: 27},
  lenguage: {fontWeight: 'bold', color: 'black', fontSize: 17},
});
