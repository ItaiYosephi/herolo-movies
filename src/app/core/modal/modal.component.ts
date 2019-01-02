import {
  Component,
  ComponentRef,
  ViewChild,
  ComponentFactoryResolver,
  OnInit,
  AfterContentInit,
  Renderer2
} from '@angular/core';
import {
  trigger,
  style,
  transition,
  animate,
} from '@angular/animations';

import { ModalService } from './modal.service';
import { ModalDirective } from './modal.directive';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css'],
  animations: [
    trigger('dialog', [
      transition('void => *', [
        style({ transform: 'scale3d(.3, .3, .3)' }),
        animate(300)
      ])
    ])
  ]
})
export class ModalComponent implements OnInit, AfterContentInit {
  component: ComponentRef<any>;
  closeSubscription: Subscription;

  @ViewChild(ModalDirective) entry: ModalDirective;

  constructor(
    private resolver: ComponentFactoryResolver,
    private modalService: ModalService,
    private renderer: Renderer2
  ) {}

  ngOnInit() {
    this.renderer.addClass(document.body, 'no-scroll');
  }

  ngAfterContentInit() {
    this.loadComponent();
  }
  loadComponent() {
    const cmp = this.modalService.childComponent;
    const componentFactory = this.resolver.resolveComponentFactory(cmp);

    const viewContainerRef = this.entry.viewContainerRef;
    viewContainerRef.clear();

    this.component = viewContainerRef.createComponent(componentFactory);
    this.closeSubscription = this.component.instance.close.subscribe(event => {
      this.destroyComponent();
    });
  }

  destroyComponent() {
    this.renderer.removeClass(document.body, 'no-scroll');
    this.closeSubscription.unsubscribe();
    this.component.destroy();
    this.modalService.close();
  }
}
