import { Pipe, PipeTransform } from '@angular/core';

/**
 * Generated class for the TruncatePipe pipe.
 *
 * See https://angular.io/docs/ts/latest/guide/pipes.html for more info on
 * Angular Pipes.
 */
@Pipe({
  name: 'formatPrice',
})
export class FormatPrice implements PipeTransform {
  /**
   * Truncates a string to the arguments value
   */
  transform(value: string, ...args) {
    console.log(value, args);
    let processedVal:any;
    if (value !== "0"){
      processedVal = value != null  ? ((parseFloat(value))/100).toFixed(2) : parseFloat("0").toFixed(2);
    } else {
      processedVal = parseFloat(processedVal).toFixed(2)
    }
    // regex to add "," to thousands positions
    return processedVal.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }
}
