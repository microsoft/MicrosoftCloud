import { CUSTOM_ELEMENTS_SCHEMA, Component } from '@angular/core';
import { RelatedContentBaseComponent } from '../shared/related-content-base.component';
import { NgIf, NgFor } from '@angular/common';
/* Based on the example found at:
  https://github.com/microsoftgraph/microsoft-graph-toolkit/blob/main/samples/angular-app/src/app/angular-agenda/angular-agenda.component.ts
*/

type CalendarEvent = { isAllDay: boolean, start: { dateTime: Date }, end: { dateTime: Date }}

@Component({
    selector: 'app-calendar-events',
    templateUrl: './calendar-events.component.html',
    styleUrls: ['./calendar-events.component.scss'],
    standalone: true,
    imports: [NgIf, NgFor],
    schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class CalendarEventsComponent extends RelatedContentBaseComponent {
  
  // Could use the following to retrieve the files via code rather 
  // than using <mgt-search-results> web component
  // In the .html template you'd need to remove the "resource" property though from the bindings
  override async search(query: string) {
    // this.data = await this.graphService.searchCalendarEvents(query);
  }

  dayFromDateTime(dateTimeString: string) {
    const date = new Date(dateTimeString);
    date.setMinutes(date.getMinutes() - date.getTimezoneOffset());
    const monthNames = [
      'January',
      'February',
      'March',
      'April',
      'May',
      'June',
      'July',
      'August',
      'September',
      'October',
      'November',
      'December'
    ];

    const monthIndex = date.getMonth();
    const day = date.getDate();
    const year = date.getFullYear();

    return monthNames[monthIndex] + ' ' + day + ' ' + year;
  }

  timeRangeFromEvent(event: CalendarEvent) {
    if (event.isAllDay) {
      return 'ALL DAY';
    }

    const prettyPrintTimeFromDateTime = (date: Date) => {
      date.setMinutes(date.getMinutes() - date.getTimezoneOffset());
      let hours = date.getHours();
      const minutes = date.getMinutes();
      const ampm = hours >= 12 ? 'PM' : 'AM';
      hours = hours % 12;
      hours = hours ? hours : 12;
      const minutesStr = minutes < 10 ? '0' + minutes : minutes;
      return hours + ':' + minutesStr + ' ' + ampm;
    };

    const start = prettyPrintTimeFromDateTime(new Date(event.start.dateTime));
    const end = prettyPrintTimeFromDateTime(new Date(event.end.dateTime));

    return start + ' - ' + end;
  }

}
