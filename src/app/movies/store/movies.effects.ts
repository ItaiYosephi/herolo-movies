import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { switchMap, map, catchError } from 'rxjs/operators';
import { Effect, Actions, ofType } from '@ngrx/effects';

import * as MoviesActions from './movies.actions';
import { Movie } from '../movie.model';
import { MoviesService } from '../movies.service';

@Injectable()
export class MoviesEffects {
  @Effect()
  fetchMovies = this.actions$.pipe(
    ofType(MoviesActions.FETCH_MOVIES),
    switchMap(() =>
      this.moviesService.fetchMovies().pipe(
        map((movies: Movie[]) => ({
          type: MoviesActions.MOVIES_FETCHED_SUCCESS,
          payload: movies
        })),
        catchError(error => {
          return of({
            type: MoviesActions.MOVIES_FETCHED_FAILED,
            payload: error
          });
        })
      )
    )
  );

  constructor(
    private actions$: Actions,
    private moviesService: MoviesService
  ) {}
}
