import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';

import { Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

import { Customer } from '../../app/shared/interfaces';
import { EmailSmsCompletion } from '../shared/interfaces';

declare const API_BASE_URL: string;

@Injectable({ providedIn: 'root' })
export class DataService {

  http = inject(HttpClient);

  getCustomers(): Observable<Customer[]> {
    return this.http.get<Customer[]>(API_BASE_URL + 'customers')
      .pipe(
        map(data => {
          // Sort by name
          return data.sort((a: Customer, b: Customer) => {
            if (a.company < b.company) {
              return -1;
            }
            if (a.company > b.company) {
              return 1;
            }
            return 0;
          });
        }),
        catchError(this.handleError)
      );

  }

  getCustomer(id: number): Observable<Customer> {
    return this.http.get<Customer[]>(API_BASE_URL + 'customers/' + id)
      .pipe(
        map(customers => {
          const customer = customers.filter((cust: Customer) => cust.id === id);
          return customer[0];
        }),
        catchError(this.handleError)
      );
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  generateSql(query: string): Observable<any> {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return this.http.post<any>(API_BASE_URL + 'generatesql', { query })
      .pipe(
        catchError(this.handleError)
      );
  }

  completeEmailSmsMessages(query: string, company: string, contactName: string): Observable<EmailSmsCompletion> {
    return this.http.post<EmailSmsCompletion>(API_BASE_URL + 'completeEmailSmsMessages', { query, company, contactName })
      .pipe(
        catchError(this.handleError)
      );
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  filter(val: string, data: any[]) {
    if (val) {
      val = val.toLowerCase();
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const filteredData = data.filter((data: any) => {
        for (const property in data) {
          const propValue = data ? data[property].toString().toLowerCase() : '';
          if (propValue && propValue.indexOf(val) > -1) {
            return true;
          }
        }
        return false;
      });
      return filteredData;
    } else {
      return null;
    }
  }

  private handleError(error: HttpErrorResponse) {
    console.error('server error:', error);
    if (error.error instanceof Error) {
      const errMessage = error.error.message;
      return throwError(() => errMessage);
      // Use the following instead if using lite-server
      // return Observable.throw(err.text() || 'backend server error');
    }
    return throwError(() => error || 'Node.js server error');
  }

}