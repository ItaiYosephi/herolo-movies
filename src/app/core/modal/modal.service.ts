import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ModalService {
  openModalSubject = new Subject();
  closeModalSubject = new Subject();
  childComponent;
  childComponentData;

  constructor() {}
  open(cmp) {
    this.childComponent = cmp;
    this.openModalSubject.next();
  }

  close() {
    this.childComponent = null;
    this.childComponentData = null;
    this.closeModalSubject.next();
  }
}
