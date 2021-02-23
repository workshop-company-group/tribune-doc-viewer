import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'documentTitle'
})
export class DocumentTitlePipe implements PipeTransform {

  private maxLength: number = 30;

  transform(value: string): string {
    let newValue = value;
    if (value.length > this.maxLength) {
      newValue = newValue.slice(0, this.maxLength) + '...';
    }

    return newValue;
  }

}
