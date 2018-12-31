import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import { AppComponent } from './app.component';
import { MovieListComponent } from './movies/movie-list/movie-list.component';
import { HeaderComponent } from './header/header.component';
import { MoviesComponent } from './movies/movies.component';
import { MovieListItemComponent } from './movies/movie-list/movie-list-item/movie-list-item.component';
import { MovieEditComponent } from './movies/movie-edit/movie-edit.component';
import { ModalComponent } from './modal/modal.component';
import { ModalDirective } from './modal/modal.directive';
import { reducers } from './store/app.reducer';
import { MoviesEffects } from './movies/store/movies.effects';

@NgModule({
  declarations: [
    AppComponent,
    MovieListComponent,
    HeaderComponent,
    MoviesComponent,
    MovieListItemComponent,
    MovieEditComponent,
    ModalComponent,
    ModalDirective
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    ReactiveFormsModule,
    StoreModule.forRoot(reducers),
    EffectsModule.forRoot([MoviesEffects]),
    BrowserAnimationsModule
  ],
  entryComponents: [MovieEditComponent],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
