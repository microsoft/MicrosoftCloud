import { Pipe, PipeTransform } from '@angular/core';
import { TitleCasePipe } from '@angular/common';

@Pipe({
    name: 'titleCaseUnderscore',
    standalone: true
})
export class TitleCaseUnderscorePipe implements PipeTransform {

  constructor(private titlecasePipe: TitleCasePipe) { }

  transform(value: string): string {
    if (!value) return value;
    
    // Replace underscores with spaces
    const stringWithSpaces = value.replace(/_/g, ' ');

    // Use Angular's TitleCasePipe to title case the string
    const titleCasedString = this.titlecasePipe.transform(stringWithSpaces);

    return titleCasedString;
  }

}