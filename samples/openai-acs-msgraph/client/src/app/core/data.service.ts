import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';

import { Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

import { BYODCompletion, Customer } from '../../app/shared/interfaces';
import { EmailSmsCompletion } from '../shared/interfaces';
import { ApiUrlService } from './api-url.service';

@Injectable({ providedIn: 'root' })
export class DataService {

  apiUrlService = inject(ApiUrlService);
  http = inject(HttpClient);

  apiUrl = this.apiUrlService.getApiUrl();

  getCustomers(): Observable<Customer[]> {
    return this.http.get<Customer[]>(this.apiUrl + 'customers')
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
    return this.http.get<Customer[]>(this.apiUrl + 'customers/' + id)
      .pipe(
        map(customers => {
          const customer = customers.filter((cust: Customer) => cust.id === id);
          return customer[0];
        }),
        catchError(this.handleError)
      );
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  generateSql(prompt: string): Observable<any> {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return this.http.post<any>(this.apiUrl + 'generateSql', { prompt })
      .pipe(
        catchError(this.handleError)
      );
  }

  completeBYOD(prompt: string): Observable<string> {
    return this.http.post<string>(this.apiUrl + 'completeBYOD', { prompt })
      .pipe(
        catchError(this.handleError)
      );
  }

  completeEmailSmsMessages(prompt: string, company: string, contactName: string): Observable<EmailSmsCompletion> {
    return this.http.post<EmailSmsCompletion>(this.apiUrl + 'completeEmailSmsMessages', { prompt, company, contactName })
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