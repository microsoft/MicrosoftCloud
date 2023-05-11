import { Pipe, PipeTransform, inject } from '@angular/core';
import { CurrencyPipe, DatePipe, DecimalPipe } from '@angular/common';
import { PhonePipe } from './phone.pipe';

@Pipe({
    name: 'dynamic',
    standalone: true
})
export class DynamicPipe implements PipeTransform {
  currencyPipe = inject(CurrencyPipe);
  datePipe = inject(DatePipe);
  decimalPipe = inject(DecimalPipe);
  phonePipe = inject(PhonePipe);

  currencyHeaders = ['price', 'total', 'amount', 'sum', 'balance', 'revenue'];
  dateHeaders = ['date', 'time', 'created', 'updated', 'deleted'];
  phoneHeaders = ['phone', 'mobile', 'phone number', 'mobile number', 'office number'];
  reviewHeaders = ['review', 'rating', 'avg'];

  transform(value: string, header: string): unknown {
    if (this.currencyHeaders.some(substr => header.includes(substr))) {
      return this.currencyPipe.transform(value);
    }

    if (this.dateHeaders.some(substr => header.includes(substr))) {
      return this.datePipe.transform(value);
    }

    if (this.phoneHeaders.some(substr => header.includes(substr))) {
      return this.phonePipe.transform(value);
    }

    if (this.reviewHeaders.some(substr => header.includes(substr))) {
      return this.decimalPipe.transform(value, '1.0-1');
    }

    return value;
  }
}