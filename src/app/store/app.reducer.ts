import * as fromMovies from '../movies/store/movies.reducer';
import { ActionReducerMap } from '@ngrx/store';

export interface AppState {
  movies: fromMovies.State;
}

export const reducers: ActionReducerMap<AppState> = {
  movies: fromMovies.MoviesReducer
};
