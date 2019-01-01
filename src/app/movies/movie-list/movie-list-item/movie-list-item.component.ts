import { Component, OnInit, Input } from '@angular/core';
import { Store } from '@ngrx/store';

import { Movie } from '../../movie.model';
import { ModalService } from 'src/app/modal/modal.service';
import { MovieEditComponent } from '../../movie-edit/movie-edit.component';
import * as MoviesActions from '../../store/movies.actions';
import * as fromApp from '../../../store/app.reducer';

@Component({
  selector: 'app-movie-list-item',
  templateUrl: './movie-list-item.component.html',
  styleUrls: ['./movie-list-item.component.css']
})
export class MovieListItemComponent implements OnInit {
  @Input() movie: Movie;

  constructor(
    private modalService: ModalService,
    private store: Store<fromApp.AppState>
  ) {}

  ngOnInit() {}

  onEdit() {
    this.store.dispatch(new MoviesActions.StartEditMovie(this.movie));
    this.modalService.open(MovieEditComponent);
  }
  onDelete() {
    this.store.dispatch(new MoviesActions.DeleteMovie(this.movie.id));
  }
}
