import { CUSTOM_ELEMENTS_SCHEMA, Component } from '@angular/core';
import { RelatedContentBaseComponent } from '@shared/related-content-base.component';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';

@Component({
    selector: 'app-emails',
    templateUrl: './emails.component.html',
    styleUrls: ['./emails.component.scss'],
    standalone: true,
    imports: [MatCardModule, MatButtonModule],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class EmailsComponent extends RelatedContentBaseComponent {

  // Could use the following to retrieve the files via code rather 
  // than using <mgt-search-results> web component
  override async search(query: string) {
    // this.data = await this.graphService.searchEmailMessages(query);
  }
  
}

