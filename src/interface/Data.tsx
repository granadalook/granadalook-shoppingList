import {Result} from './Result';

export interface Data {
  page: number;
  results: Result[];
  total_pages: number;
  total_results: number;
}
