import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';

import * as fromApp from '../../store/app.reducer';
import * as fromMovies from '../store/movies.reducer';
import * as MoviesActions from '../store/movies.actions';

@Component({
  selector: 'app-movie-list',
  templateUrl: './movie-list.component.html',
  styleUrls: ['./movie-list.component.css']
})
export class MovieListComponent implements OnInit {
  moviesState: Observable<fromMovies.State>;

  constructor(private store: Store<fromApp.AppState>) {}

  ngOnInit() {
    this.store.dispatch(new MoviesActions.FetchMovies());
    this.moviesState = this.store.select('movies');
  }
}
