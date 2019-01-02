import { Directive, Input, HostListener, ElementRef } from '@angular/core';

@Directive({
  selector: '[appImage]'
})
export class DefaultImageDirective {
  constructor(private el: ElementRef) {}

  @Input() default: string;
  @HostListener('error') updateUrl() {
    this.el.nativeElement.src = this.default;
  }
}
