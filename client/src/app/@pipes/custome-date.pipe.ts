import { Pipe, PipeTransform } from '@angular/core';
import * as moment from 'moment';

@Pipe({
  name: 'customeDate'
})
export class CustomeDatePipe implements PipeTransform {

  transform(value: Date, ...args: unknown[]): unknown {
    return moment(value).format('DD MMM, YYYY');
  }

}
