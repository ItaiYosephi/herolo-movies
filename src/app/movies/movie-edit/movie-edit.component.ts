import {
  Component,
  OnInit,
  OnDestroy,
  Output,
  EventEmitter
} from '@angular/core';
import { Store } from '@ngrx/store';

import { FormGroup, FormControl, Validators } from '@angular/forms';
import * as MoviesActions from '../store/movies.actions';
import * as fromApp from '../../store/app.reducer';
import * as fromMovies from '../../movies/store/movies.reducer';

import { take, map, tap } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-movie-edit',
  templateUrl: './movie-edit.component.html',
  styleUrls: ['./movie-edit.component.css']
})
export class MovieEditComponent implements OnInit, OnDestroy {
  @Output() close = new EventEmitter<any>();
  movie;
  editMode = false;
  movieForm: FormGroup;

  constructor(private store: Store<fromApp.AppState>) {}

  ngOnInit() {
    this.store
      .select('movies')
      .pipe(take(1))
      .subscribe((moviesState: fromMovies.State) => {
        console.log(moviesState);
        if (moviesState.editedMovie) {
          this.movie = {
            ...moviesState.editedMovie
          };
          this.editMode = true;
          this.movie.Runtime = parseInt(this.movie.Runtime, 10);
        } else {
          console.log('editing mode');
          this.movie = {
            Title: null,
            Year: null,
            Runtime: null,
            Genre: null,
            Director: null,
            ImageUrl: null
          };
        }
        this.initForm();
      });
  }

  ngOnDestroy() {
    this.store.dispatch(new MoviesActions.StopEditMovie());
  }
  initForm() {
    this.movieForm = new FormGroup({
      Title: new FormControl(
        this.movie.Title,
        [Validators.required],
        [this.forbiddenTitleValidator.bind(this)]
      ),
      Year: new FormControl(this.movie.Year, [
        Validators.required,
        Validators.min(1900),
        Validators.max(new Date().getFullYear())
      ]),
      Runtime: new FormControl(this.movie.Runtime, Validators.required),
      Genre: new FormControl(this.movie.Genre, Validators.required),
      Director: new FormControl(this.movie.Director, Validators.required),
      ImageUrl: new FormControl(this.movie.ImageUrl, [Validators.required])
    });
  }

  onSubmit() {
    const movie = {
      ...this.movieForm.value,
      Runtime: this.movieForm.value.Runtime + ' min'
    };
    if (this.editMode) {
      this.store.dispatch(
        new MoviesActions.UpdateMovie({ ...movie, id: this.movie.id })
      );
    } else {
      this.store.dispatch(
        new MoviesActions.AddMovie({ ...movie, id: Date.now() })
      );
    }
    this.close.emit();
  }

  onClose() {
    this.close.emit();
  }
  forbiddenTitleValidator(
    control: FormControl
  ): Promise<any> | Observable<any> {
    return this.store.select('movies').pipe(
      take(1),
      map((moviesState: fromMovies.State) => {
        const existingMovie = moviesState.movies.find(movie => {
          return movie.Title.toLowerCase() === control.value.toLowerCase();
        });
        if (existingMovie && existingMovie.id !== moviesState.editedMovie.id) {
          return {
            titleIsForbidden: true
          };
        } else {
          return null;
        }
      })
    );
  }

  required(name: string) {
    return (
      this.movieForm.get(name).touched &&
      this.movieForm.get(name).errors &&
      this.movieForm.get(name).errors.required
    );
  }

  get forbiddenTitle() {
    return (
      this.movieForm.get('Title').errors &&
      this.movieForm.get('Title').errors.titleIsForbidden &&
      this.movieForm.get('Title').touched
    );
  }
  get invalidYear() {
    return (
      this.movieForm.get('Year').errors &&
      this.movieForm.get('Year').touched &&
      (this.movieForm.get('Year').errors.min ||
        this.movieForm.get('Year').errors.max)
    );
  }

  get Year() {
    return this.movieForm.get('Year');
  }
}
