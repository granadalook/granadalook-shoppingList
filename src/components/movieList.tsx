import {FlatList, StyleSheet, ActivityIndicator, Platform} from 'react-native';
import React from 'react';
import MovieCard from './MovieCard';

export default function movieList(props: any) {
  const {movies, loadMovies} = props;
  const renderItem = ({item}) => <MovieCard movieCard={item} />;
  const loadMore = () => {
    loadMovies();
  };

  return (
    <FlatList
      data={movies}
      numColumns={2}
      showsVerticalScrollIndicator={false}
      renderItem={renderItem}
      keyExtractor={item => String(item.id)}
      contentContainerStyle={styles.flatListContentContainer}
      onEndReached={loadMore}
      onEndReachedThreshold={0.1}
      ListFooterComponent={
        <ActivityIndicator size="large" style={styles.spiner} />
      }
    />
  );
}

const styles = StyleSheet.create({
  flatListContentContainer: {
    paddingHorizontal: Platform.OS === 'android' ? 15 : 30,
  },
  spiner: {marginTop: 20, marginBottom: 60},
});
