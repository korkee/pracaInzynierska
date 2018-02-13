import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterBody'
})
export class FilterBodyPipe implements PipeTransform {

  transform(filter2: any, term1: any): any {
    if (term1 === undefined) return filter2;
    return filter2.filter(function (room) {
      return room.body.toLowerCase().includes(term1.toLowerCase());

    })
  }

}
