import { PipeTransform, Pipe } from '@angular/core';

@Pipe({
  name: 'english'
})
export class EnglishPipe implements PipeTransform {
  transform(value: any) {
    if (value) {
      return value.replace(/[^\w\s]/gi, '');
    } else {
      return '';
    }
  }
}
