import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterDate'
})
export class FilterDatePipe implements PipeTransform {

  transform(filter: any, term2: any): any {
    //check is undefind
    if (term2 === undefined) return filter;
    return filter.filter(function (room) {
      return room.startAt.toLowerCase().includes(term2.toLowerCase());

    })
  }

}
