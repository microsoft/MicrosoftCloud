import { Component, CUSTOM_ELEMENTS_SCHEMA, inject, OnDestroy } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { RelatedContentBaseComponent } from '../shared/related-content-base.component';
import { TeamsDialogData } from '../textarea-dialog/dialog-data';
import { TextAreaDialogComponent } from '../textarea-dialog/textarea-dialog.component';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { NgIf, NgFor } from '@angular/common';

@Component({
    selector: 'app-chats',
    templateUrl: './chats.component.html',
    styleUrls: ['./chats.component.scss'],
    standalone: true,
    imports: [NgIf, NgFor, MatButtonModule, MatCardModule],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ChatsComponent extends RelatedContentBaseComponent implements OnDestroy {
  subscription: Subscription = new Subscription();
  dialog = inject(MatDialog);
  dialogData: TeamsDialogData = {
    id: '',
    teamId: '',
    channelId: '',
    message: '',
    webUrl: 'response.webUrl',
    title: 'Send Teams Chat',
    action: this.graphService.sendTeamsChat
  }

  openDialog() {
    this.dialogData.message = this.searchText;
    const dialogRef = this.dialog.open(TextAreaDialogComponent, {
      data: this.dialogData
    });

    this.subscription = dialogRef.afterClosed().subscribe(response => {
      console.log('Teams chat dialog result:', response);
      if (response) {
        this.dialogData = response;
        this.search(this.searchText);
      }
    });
  }

  // Could use the following to retrieve the files via code rather 
  // than using <mgt-search-results> web component
  override async search(query: string) {
    this.data = await this.graphService.searchChatMessages(query);
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
