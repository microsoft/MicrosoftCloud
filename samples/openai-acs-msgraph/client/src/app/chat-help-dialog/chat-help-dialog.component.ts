import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { DataService } from '@core/data.service';

@Component({
    selector: 'app-chat-help-dialog',
    templateUrl: './chat-help-dialog.component.html',
    styleUrls: ['./chat-help-dialog.component.scss'],
    imports: [CommonModule, FormsModule, MatButtonModule, MatDialogModule, MatIconModule]
})
export class ChatHelpDialogComponent {
  prompt = 'How should I handle a company refund request?';
  placeholder = 'How should I handle a company refund request?';
  response = '';
  dataService = inject(DataService)

  getHelp() {
    this.dataService.completeBYOD(this.prompt).subscribe((response: string) => {
      this.response = response;
    });
  }
}
