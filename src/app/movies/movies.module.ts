import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { MoviesComponent } from './movies.component';
import { MovieListComponent } from './movie-list/movie-list.component';
import { MovieListItemComponent } from './movie-list/movie-list-item/movie-list-item.component';
import { MovieEditComponent } from './movie-edit/movie-edit.component';
import { EnglishPipe } from './english.pipe';
import { MovieDeleteConfirmComponent } from './movie-delete-confirm/movie-delete-confirm.component';
import { DefaultImageDirective } from '../default-image.directive';

@NgModule({
  declarations: [
    MoviesComponent,
    MovieListComponent,
    MovieListItemComponent,
    MovieEditComponent,
    EnglishPipe,
    MovieDeleteConfirmComponent,
    DefaultImageDirective
  ],
  entryComponents: [MovieEditComponent],
  imports: [CommonModule, ReactiveFormsModule],
  exports: [MoviesComponent]
})
export class MoviesModule {}
