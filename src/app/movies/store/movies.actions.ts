import { Action } from '@ngrx/store';
import { Movie } from '../movie.model';

export const FETCH_MOVIES = 'FETCH_MOVIES';
export const MOVIES_FETCHED = 'MOVIES_FETCHED';
export const ADD_MOVIE = 'ADD_MOVIE';
export const START_EDIT_MOVIE = 'START_EDIT_MOVIE';
export const STOP_EDIT_MOVIE = 'STOP_EDIT_MOVIE';
export const UPDATE_MOVIE = 'UPDATE_MOVIE';
export const DELETE_MOVIE = 'DELETE_MOVIE';

export class FetchMovies implements Action {
  readonly type = FETCH_MOVIES;
}

export class MoviesFetched implements Action {
  readonly type = MOVIES_FETCHED;

  constructor(public payload: Movie[]) {}
}

export class AddMovie implements Action {
  readonly type = ADD_MOVIE;

  constructor(public payload: Movie) {}
}

export class StartEditMovie implements Action {
  readonly type = START_EDIT_MOVIE;

  constructor(public payload: Movie) {}
}

export class StopEditMovie implements Action {
  readonly type = STOP_EDIT_MOVIE;
}

export class UpdateMovie implements Action {
  readonly type = UPDATE_MOVIE;

  constructor(public payload: Movie) {}
}

export class DeleteMovie implements Action {
  readonly type = DELETE_MOVIE;

  constructor(public payload: number) {}
}

export type MoviesActions =
  | AddMovie
  | UpdateMovie
  | StartEditMovie
  | StopEditMovie
  | DeleteMovie
  | FetchMovies
  | MoviesFetched;
