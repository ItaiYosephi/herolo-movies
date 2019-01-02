import { Component, OnInit, OnDestroy } from '@angular/core';
import { ModalService } from './core/modal/modal.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'herolo-movies';
  showModal = false;
  openModalSubscription: Subscription;
  closeModalSubscription: Subscription;

  constructor(private modalSerivce: ModalService) {}

  ngOnInit() {
    this.openModalSubscription = this.modalSerivce.openModalSubject.subscribe(
      () => {
        this.showModal = true;
      }
    );
    this.closeModalSubscription = this.modalSerivce.closeModalSubject.subscribe(
      () => {
        this.showModal = false;
      }
    );
  }

  ngOnDestroy() {
    this.openModalSubscription.unsubscribe();
    this.closeModalSubscription.unsubscribe();
  }
}
