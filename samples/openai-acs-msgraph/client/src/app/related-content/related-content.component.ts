import { Component, Input, NO_ERRORS_SCHEMA } from '@angular/core';
import { MatIconRegistry, MatIconModule } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';
import { Customer } from '@shared/interfaces';
import { CalendarEventsComponent } from '../calendar-events/calendar-events.component';
import { EmailsComponent } from '../emails/emails.component';
import { ChatsComponent } from '../chats/chats.component';
import { FilesComponent } from '../files/files.component';
import { MatBadgeModule } from '@angular/material/badge';
import { MatTabsModule } from '@angular/material/tabs';
import { FilterTextboxComponent } from '../shared/filter-textbox.component';
import { MatCardModule } from '@angular/material/card';

type ContentCounts = {
  files: number;
  emails: number;
  chats: number;
  agendaEvents: number;
};

type ContentCountType = keyof ContentCounts;

@Component({
    selector: 'app-related-content',
    templateUrl: './related-content.component.html',
    styleUrls: ['./related-content.component.scss'],
    standalone: true,
    imports: [MatCardModule, MatIconModule, FilterTextboxComponent, MatTabsModule, 
      MatBadgeModule, FilesComponent, ChatsComponent, EmailsComponent, CalendarEventsComponent],
    schemas: [ NO_ERRORS_SCHEMA ]
})
export class RelatedContentComponent {

  closed = true;
  selectedQueryText = '';
  contentCounts: ContentCounts = {
    files: 0,
    emails: 0,
    chats: 0,
    agendaEvents: 0
  };

  customer: Customer | null = null;
  @Input()
  set selectedCustomer(value: Customer | null) {
    this.customer = value;
    this.closed = false;
    if (value) {
      this.selectedQueryText = value.company;
    }
  }

  constructor(private iconRegistry: MatIconRegistry, private sanitizer: DomSanitizer) { }

  filter(data: string) {
    this.selectedQueryText = data.trim();
  }

  dataLoaded(type: ContentCountType, data: any) {
    this.contentCounts[type] = data.length;
  }

  closeCard() {
    this.closed = true;
  }

}
