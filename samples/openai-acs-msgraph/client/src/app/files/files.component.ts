import { CUSTOM_ELEMENTS_SCHEMA, Component } from '@angular/core';
import { NgIf } from '@angular/common';
import { RelatedContentBaseComponent } from '../shared/related-content-base.component';

@Component({
    selector: 'app-files',
    templateUrl: './files.component.html',
    styleUrls: ['./files.component.scss'],
    standalone: true,
    imports: [NgIf],
    schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class FilesComponent extends RelatedContentBaseComponent {

  // Could use the following to retrieve the files via code rather 
  // than using <mgt-search-results> web component
  override async search(query: string) {
    // this.data = await this.graphService.searchFiles(query);
  }

}
