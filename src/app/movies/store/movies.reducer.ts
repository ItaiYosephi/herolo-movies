import * as MoviesActions from './movies.actions';

import { Movie } from './../movie.model';

export interface State {
  movies: Movie[];
  editedMovie: Movie;
}
const initialState: State = {
  movies: [],
  editedMovie: null
};
export function MoviesReducer(
  state = initialState,
  action: MoviesActions.MoviesActions
) {
  switch (action.type) {
    case MoviesActions.MOVIES_FETCHED: {
      return {
        ...state,
        movies: [...action.payload]
      };
    }
    case MoviesActions.ADD_MOVIE: {
      return {
        ...state,
        movies: [action.payload, ...state.movies],
        editedMovie: null
      };
    }
    case MoviesActions.START_EDIT_MOVIE: {
      return {
        ...state,
        editedMovie: action.payload ? { ...action.payload } : null
      };
    }
    case MoviesActions.STOP_EDIT_MOVIE: {
      return {
        ...state,
        editedMovie: null
      };
    }
    case MoviesActions.UPDATE_MOVIE: {
      const movies = [...state.movies];
      const idx = movies.findIndex(movie => movie.id === action.payload.id);
      movies.splice(idx, 1, action.payload);
      return {
        ...state,
        movies: [...movies],
        editedMovie: null
      };
    }
    case MoviesActions.DELETE_MOVIE: {
      const movies = [...state.movies];
      const idx = movies.findIndex(movie => movie.id === action.payload);
      movies.splice(idx, 1);
      return {
        ...state,
        movies: [...movies]
      };
    }
    default: {
      return state;
    }
  }
}
