import { Pipe, PipeTransform } from '@angular/core';
import { Category } from '../model/category';

@Pipe({
  name: 'filtercategory',
  pure: false,
})
export class FiltercategoryPipe implements PipeTransform {
  transform(
    value: Array<any>,
    serchname: string,
    property: string
  ): Array<any> {
    if (value.length === 0 || serchname.length < 0 || property.length < 0) {
      return value;
    } else {
      return value.filter((item) => {
        return item[property]
          .toLowerCase()
          .match(serchname.toLocaleLowerCase());
      });
    }
  }
}
