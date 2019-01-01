import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

import { ModalService } from '../modal/modal.service';
import { MovieEditComponent } from './movie-edit/movie-edit.component';
import { Movie } from './movie.model';
import * as MoviesActions from './store/movies.actions';
import * as fromApp from '../store/app.reducer';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-movies',
  templateUrl: './movies.component.html',
  styleUrls: ['./movies.component.css']
})
export class MoviesComponent implements OnInit, OnDestroy {
  editSubscription: Subscription;
  addMovieSubscription: Subscription;
  movieToEdit: Movie = null;

  constructor(
    private modalSerivce: ModalService,
    private store: Store<fromApp.AppState>
  ) {}

  ngOnInit() {}
  closeEdit() {
    this.movieToEdit = null;
  }

  ngOnDestroy() {}

  onAddMovie() {
    this.store.dispatch(new MoviesActions.StartEditMovie(null));
    this.modalSerivce.open(MovieEditComponent);
  }
}
