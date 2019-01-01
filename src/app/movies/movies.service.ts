import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { forkJoin, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { Movie } from './movie.model';
import { IMDB_MOVIES_IDS } from './movies-to-fetch';

let nextId = 0;

@Injectable({
  providedIn: 'root'
})
export class MoviesService {
  fetchMovies() {
    const requests: Observable<Movie>[] = [];
    IMDB_MOVIES_IDS.forEach(id => {
      const movieReq = this.fetchMovie(id);
      requests.push(movieReq);
    });
    return forkJoin(requests);
  }

  fetchMovie(imdbId): Observable<Movie> {
    return this.httpClient
      .get<any>(`http://www.omdbapi.com/?i=${imdbId}&apikey=c1d818f4`)
      .pipe(
        map(response => {
          const { Title, Year, Runtime, Genre, Director, Poster } = response;
          const movie: Movie = {
            id: this.getNextId(),
            Title,
            Year,
            Runtime,
            Genre,
            Director,
            ImageUrl: Poster
          };
          return movie;
        })
      );
  }

  getEmptyMovie() {
    return {
      Title: null,
      Year: null,
      Runtime: null,
      Genre: null,
      Director: null,
      ImageUrl: null
    };
  }
  getNextId() {
    return nextId++;
  }

  constructor(private httpClient: HttpClient) {}
}
