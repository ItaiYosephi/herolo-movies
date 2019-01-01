import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { forkJoin } from 'rxjs';
import { map } from 'rxjs/operators';

import { Movie } from './movie.model';
import { IMDB_MOVIES_IDS } from './movies-to-fetch';

@Injectable({
  providedIn: 'root'
})
export class MoviesService {
  fetchMovies() {
    const requests = [];
    IMDB_MOVIES_IDS.forEach(id => {
      // api for Movie Details
      const omdbApiReq = this.httpClient.get<any>(
        `http://www.omdbapi.com/?i=${id}&apikey=c1d818f4`
      );
      // api with nicer Poster Images
      const moviedbApiReq = this.httpClient.get<any>(
        `https://api.themoviedb.org/3/find/${id}?api_key=2ddf717137b949f4905bfb4c11498248&external_source=imdb_id`
      );
      // combining both request and mapping to a Movie Object
      const combinedReqs = forkJoin([omdbApiReq, moviedbApiReq]).pipe(
        map(responses => {
          const { Title, Year, Runtime, Genre, Director } = responses[0];
          const posterPath = responses[1].movie_results[0].poster_path;
          const ImageUrl = 'https://image.tmdb.org/t/p/w500' + posterPath;
          const movie: Movie = {
            id: Date.now(),
            Title,
            Year,
            Runtime,
            Genre,
            Director,
            ImageUrl
          };

          return movie;
        })
      );

      requests.push(combinedReqs);
    });
    return forkJoin(requests);
  }

  constructor(private httpClient: HttpClient) {}
}
