import { Pipe, PipeTransform } from '@angular/core';

/**
 * Generated class for the FormatAccountNumberPipe pipe.
 *
 * See https://angular.io/docs/ts/latest/guide/pipes.html for more info on
 * Angular Pipes.
 */
@Pipe({
  name: 'formatAccountNumber',
})
export class FormatAccountNumberPipe implements PipeTransform {
  /**
   * Takes a value and makes it lowercase.
   */
  // transform(value: string, ...args) {
  //   return value.toLowerCase();
  // }
  transform(value: string, ...args) {
    console.log(value, typeof value, args);
    return value.split(/(?=.{3}$)/).join('-').split(/(?=.{1}$)/).join('-');
  }
}
