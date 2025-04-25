import {environment} from '../environments/environments';
import axios from 'axios';
import {Data} from '../interface/Data';
import {Detail} from '../interface/MovieDetail';
export async function getALLPopularMovies(page: number) {
  try {
    const response = await axios.get<Data>(
      `${environment.URL_BASE}${environment.POPULAR}?${
        environment.API_KEY
      }&language=en-US&page=${page.toString()}`,
    );
    return {
      data: response.data.results,
    };
  } catch (error) {
    throw error;
  }
}
export async function getMovieDetailById(idMovie: string) {
  try {
    const response = await axios.get<Detail>(
      `${environment.URL_BASE}${idMovie}?${environment.API_KEY}&language=en-US`,
    );
    return {
      data: response.data,
    };
  } catch (error) {
    throw error;
  }
}
