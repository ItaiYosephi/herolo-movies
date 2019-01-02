import {
  Component,
  OnInit,
  Output,
  EventEmitter,
  OnDestroy
} from '@angular/core';
import { Store } from '@ngrx/store';

import * as fromApp from '../../store/app.reducer';
import * as MoviesActions from '../store/movies.actions';

@Component({
  selector: 'app-movie-delete-confirm',
  templateUrl: './movie-delete-confirm.component.html',
  styleUrls: ['./movie-delete-confirm.component.css']
})
export class MovieDeleteConfirmComponent implements OnDestroy {
  @Output() close = new EventEmitter<any>();

  constructor(private store: Store<fromApp.AppState>) {}

  onDelete() {
    this.store.dispatch(new MoviesActions.DeleteMovie());
  }

  onClose() {
    this.close.emit();
  }

  ngOnDestroy() {
    this.store.dispatch(new MoviesActions.CancleDeleteMovie());
  }
}
