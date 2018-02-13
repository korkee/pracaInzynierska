import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {

  transform(filter: any, term: any): any {
    //check is undefind
    if(term === undefined) return filter;
    return filter.filter(function (room) {
      return room.city.toLowerCase().includes(term.toLowerCase());

   })
  }

}
