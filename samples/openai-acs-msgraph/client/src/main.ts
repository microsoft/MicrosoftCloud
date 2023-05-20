import { importProvidersFrom } from '@angular/core';
import { AppComponent } from './app/app.component';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTabsModule } from '@angular/material/tabs';
import { MatMenuModule } from '@angular/material/menu';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatDialogModule } from '@angular/material/dialog';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatBadgeModule } from '@angular/material/badge';
import { withInterceptorsFromDi, provideHttpClient, withInterceptors, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { provideAnimations } from '@angular/platform-browser/animations';
import { BrowserModule, bootstrapApplication } from '@angular/platform-browser';
import { PhonePipe } from './app/shared/phone.pipe';
import { CurrencyPipe, DatePipe, DecimalPipe, TitleCasePipe } from '@angular/common';
import { OverlayRequestResponseInterceptor } from './app/core/overlay/overlay-request-response.interceptor';


bootstrapApplication(AppComponent, {
    providers: [
        importProvidersFrom(BrowserModule, FormsModule, MatBadgeModule, MatButtonModule, MatCardModule, 
          MatDialogModule, MatExpansionModule, MatMenuModule, MatTabsModule, MatToolbarModule, MatIconModule),       
        CurrencyPipe, DatePipe, DecimalPipe, PhonePipe, TitleCasePipe,
        provideAnimations(),
        provideHttpClient(withInterceptorsFromDi()),
        {
          provide: HTTP_INTERCEPTORS,
          useClass: OverlayRequestResponseInterceptor,
          multi: true,
        }
    ]
  })
  .catch(err => console.error(err));
