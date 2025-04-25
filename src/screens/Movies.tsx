import React, {useState, useEffect} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import {getALLPopularMovies, getMovieDetailById} from '../api/moviesApi';
import {Result} from '../interface/Result';
import MovieList from '../components/movieList';
import {environment} from '../environments/environments';

export default function Movies() {
  const [movies, setMovies] = useState<Array<Result>>([]);
  const [page, setPage] = useState(1);
  useEffect(() => {
    (async () => {
      await loadMovies();
    })();
  }, []);

  const loadMovies = async () => {
    try {
      const response = await getALLPopularMovies(page);

      const moviesList: React.SetStateAction<any[]> = [];
      for await (const movie of response.data) {
        const movieDetail = await getMovieDetailById(movie.id.toString());
        moviesList.push({
          title: movieDetail.data.title,
          id: movieDetail.data.id,
          homepage: movieDetail.data.homepage,
          overview: movieDetail.data.overview,
          poster_path: `${environment.IMAGE}${movieDetail.data.poster_path}`,
        });
      }

      setMovies([...movies, ...moviesList]);
      setPage(page + 1);
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <SafeAreaView>
      <MovieList movies={movies} loadMovies={loadMovies} />
    </SafeAreaView>
  );
}
