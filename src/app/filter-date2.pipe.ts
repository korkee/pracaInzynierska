import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterDate2'
})
export class FilterDate2Pipe implements PipeTransform {

  transform(filter: any, term3: any): any {
    //check is undefind
    if (term3 === undefined) return filter;
    return filter.filter(function (room) {
      return room.endsAt.toLowerCase().includes(term3.toLowerCase());

    })
  }

}
