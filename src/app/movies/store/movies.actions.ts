import { Action } from '@ngrx/store';
import { Movie } from '../movie.model';

export const FETCH_MOVIES = 'FETCH_MOVIES';
export const MOVIES_FETCHED_SUCCESS = 'MOVIES_FETCHED_SUCCESS';
export const MOVIES_FETCHED_FAILED = 'MOVIES_FETCHED_FAILED';
export const ADD_MOVIE = 'ADD_MOVIE';
export const START_EDIT_MOVIE = 'START_EDIT_MOVIE';
export const STOP_EDIT_MOVIE = 'STOP_EDIT_MOVIE';
export const UPDATE_MOVIE = 'UPDATE_MOVIE';
export const CONFIRM_DELETE_MOVIE = 'CONFIRM_DELETE_MOVIE';
export const CANCLE_MOVIE_DELETE = 'CANCLE_MOVIE_DELETE';
export const DELETE_MOVIE = 'DELETE_MOVIE';

export class FetchMovies implements Action {
  readonly type = FETCH_MOVIES;
}

export class MoviesFetchedSuccess implements Action {
  readonly type = MOVIES_FETCHED_SUCCESS;

  constructor(public payload: Movie[]) {}
}

export class MoviesFetchedFailed implements Action {
  readonly type = MOVIES_FETCHED_FAILED;

  constructor(public payload: any) {}
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

export class ConfirmDeleteMovie implements Action {
  readonly type = CONFIRM_DELETE_MOVIE;

  constructor(public payload: number) {}
}

export class CancleDeleteMovie implements Action {
  readonly type = CANCLE_MOVIE_DELETE;
}

export class DeleteMovie implements Action {
  readonly type = DELETE_MOVIE;
}

export type MoviesActions =
  | AddMovie
  | UpdateMovie
  | StartEditMovie
  | StopEditMovie
  | ConfirmDeleteMovie
  | CancleDeleteMovie
  | DeleteMovie
  | FetchMovies
  | MoviesFetchedSuccess
  | MoviesFetchedFailed;
