import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { AcsUser, EmailSmsResponse } from '../shared/interfaces';
import { ApiUrlService } from './api-url.service';

@Injectable({
  providedIn: 'root'
})
export class AcsService {

  http = inject(HttpClient);
  apiUrlService = inject(ApiUrlService);
  apiUrl = this.apiUrlService.getApiUrl();

  getAcsToken(): Observable<AcsUser> {
    return this.http.get<AcsUser>(this.apiUrl + 'acstoken')
      .pipe(
        catchError(this.handleError)
      );
  }

  sendSms(message: string, customerPhoneNumber: string) : Observable<EmailSmsResponse> {
    return this.http.post<EmailSmsResponse>(this.apiUrl + 'sendSms', { message, customerPhoneNumber })
    .pipe(
      catchError(this.handleError)
    );
  }  

  sendEmail(subject: string, message: string, customerName: string, customerEmailAddress: string) : Observable<EmailSmsResponse> {
    return this.http.post<EmailSmsResponse>(this.apiUrl + 'sendEmail', { subject, message, customerName, customerEmailAddress })
    .pipe(
      catchError(this.handleError)
    );
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
