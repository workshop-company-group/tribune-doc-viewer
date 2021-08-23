import { Pipe, PipeTransform } from '@angular/core';

const MAX_LENGTH = 30;

@Pipe({
  name: 'documentTitle',
})
export class DocumentTitlePipe implements PipeTransform {

  public transform(value: string): string {
    let newValue = value;
    if (value.length > MAX_LENGTH) {
      newValue = `${newValue.slice(0, MAX_LENGTH)}...`;
    }

    return newValue;
  }

}
