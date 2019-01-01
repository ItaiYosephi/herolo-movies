import { Injectable } from '@angular/core';
import { switchMap, map } from 'rxjs/operators';
import { Effect, Actions, ofType } from '@ngrx/effects';

import * as MoviesActions from './movies.actions';
import { Movie } from '../movie.model';
import { MoviesService } from '../movies.service';

@Injectable()
export class MoviesEffects {
  @Effect()
  fetchMovies = this.actions$.pipe(
    ofType(MoviesActions.FETCH_MOVIES),
    switchMap(() => this.moviesService.fetchMovies()),
    map((movies: Movie[]) => {
      return {
        type: MoviesActions.MOVIES_FETCHED,
        payload: movies
      };
    })
  );

  constructor(
    private actions$: Actions,
    private moviesService: MoviesService
  ) {}
}
