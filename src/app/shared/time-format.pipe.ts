import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'timeFormat'
})
export class TimeFormatPipe implements PipeTransform {

  transform(time: number): any {
    const h = this.format(time / 3600);
    time = time % 3600;
    const m = this.format(time / 60);
    const s = this.format(time % 60);
    return h + ':' + m + ':' + s;
  }

  format(value: number) {
    const result = Math.floor(value).toString();
    return (result.length < 2
              ? '0' + result
              : result);
  }

}
