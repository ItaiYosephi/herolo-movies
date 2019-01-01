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
  keyframes
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
      ]),
      // transition('* => void', [
      //   animate(100000, style({ transform: 'scale3d(.0, .0, .0)' }))
      // ])
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
      console.log(event);
      this.destroyComponent();
    });

    // (<AdComponent>componentRef.instance).data = adItem.data;
    // console.log('tiis. enloading');
    // const authFormFactory = this.resolver.resolveComponentFactory(cmp);
    // this.component = this.entry.createComponent(authFormFactory);

    // if (this.component.instance.accept) {
    //   this.component.instance.accept.subscribe(event => {
    //     console.log(event);
    //     this.destroyComponent();
    //   });
    // }
    // if (this.component.instance.decline) {
    //   this.component.instance.decline.subscribe(event => {
    //     console.log(event);
    //     this.destroyComponent();
    //   });
    // }
  }

  destroyComponent() {
    console.log('distoyy');
    this.renderer.removeClass(document.body, 'no-scroll');

    this.closeSubscription.unsubscribe();
    this.component.destroy();
    this.modalService.close();
  }
}
