import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'phone',
    standalone: true
})
export class PhonePipe implements PipeTransform {

  transform(value: string | number): string {
    let phoneNumber = value.toString();

    // Remove the plus symbol if present
    if (phoneNumber.startsWith('+')) {
      phoneNumber = phoneNumber.slice(1);
    }

    // Check if the phone number is at least 10 digits long
    if (phoneNumber.length < 10) {
      return value.toString();
    }

    // Extract the last 10 digits and any remaining digits as the country code
    const countryCode = phoneNumber.slice(0, -10);
    const areaCode = phoneNumber.slice(-10, -7);
    const firstPart = phoneNumber.slice(-7, -4);
    const secondPart = phoneNumber.slice(-4);

    // Format the phone number including the country code
    return `+${countryCode} (${areaCode}) ${firstPart}-${secondPart}`;
  }

}
