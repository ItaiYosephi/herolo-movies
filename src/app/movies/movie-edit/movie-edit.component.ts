import {
  Component,
  OnInit,
  OnDestroy,
  Output,
  EventEmitter
} from '@angular/core';
import { Store } from '@ngrx/store';
import { take, map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { MoviesService } from '../movies.service';
import { Movie } from '../movie.model';
import * as fromApp from '../../store/app.reducer';
import * as fromMovies from '../../movies/store/movies.reducer';
import * as MoviesActions from '../store/movies.actions';

@Component({
  selector: 'app-movie-edit',
  templateUrl: './movie-edit.component.html',
  styleUrls: ['./movie-edit.component.css']
})
export class MovieEditComponent implements OnInit, OnDestroy {
  @Output() close = new EventEmitter<any>();
  movieForm: FormGroup;
  movie;
  editMode = false;
  editedMovieId: number = null;
  showImage = false;
  constructor(
    private store: Store<fromApp.AppState>,
    private moviesService: MoviesService
  ) {}

  ngOnInit() {
    this.store
      .select('movies')
      .pipe(take(1))
      .subscribe((moviesState: fromMovies.State) => {
        if (moviesState.editedMovie) {
          this.editedMovieId = moviesState.editedMovie.id;
          this.movie = {
            ...moviesState.editedMovie
          };
          this.editMode = true;
          this.movie.Runtime = parseInt(this.movie.Runtime, 10);
        } else {
          this.movie = this.moviesService.getEmptyMovie();
        }
        this.initForm();
      });
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
      map((moviesState: fromMovies.State) =>
        moviesState.movies.find(
          movie =>
            movie.Title.toLowerCase() === control.value.toLowerCase().trim()
        )
      ),
      map((existingMovie: Movie) => {
        if (
          !existingMovie ||
          (existingMovie && existingMovie.id === this.editedMovieId)
        ) {
          return null;
        } else {
          return {
            titleIsForbidden: true
          };
        }
      })
    );
  }
  toggleImage() {
    this.showImage = !this.showImage;
  }

  ngOnDestroy() {
    this.store.dispatch(new MoviesActions.StopEditMovie());
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
}
