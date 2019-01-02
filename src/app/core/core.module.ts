import { NgModule } from '@angular/core';

import { HeaderComponent } from './header/header.component';
import { ModalComponent } from './modal/modal.component';
import { ModalDirective } from './modal/modal.directive';

@NgModule({
  declarations: [HeaderComponent, ModalComponent, ModalDirective],
  exports: [HeaderComponent, ModalComponent]
})
export class CoreModule {}
