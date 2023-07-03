import { CUSTOM_ELEMENTS_SCHEMA, Component, EventEmitter, OnInit, Output, inject } from '@angular/core';
import { Providers } from '@microsoft/mgt';
import { EventBusService, Events } from '../core/eventbus.service';
import { FeatureFlagsService } from '../core/feature-flags.service';
import { Phone } from '../shared/interfaces';
import { Subscription } from 'rxjs';
import { NgIf } from '@angular/common';
import { PhoneCallComponent } from '../phone-call/phone-call.component';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatDialog } from '@angular/material/dialog';
import { ChatHelpDialogComponent } from '../chat-help-dialog/chat-help-dialog.component';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss'],
    standalone: true,
    imports: [MatToolbarModule, MatIconModule, PhoneCallComponent, NgIf],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class HeaderComponent implements OnInit {

  @Output() userLoggedIn = new EventEmitter();
  callVisible = false;
  callData = {} as Phone;
  subscription = new Subscription();
  dialog = inject(MatDialog);

  constructor(private eventBus: EventBusService, public featureFlags: FeatureFlagsService) { }

  ngOnInit() {
    this.subscription.add(
      this.eventBus.on(Events.CustomerCall, (data: Phone) => {
        this.callVisible = true;
        this.callData = data;
      })
    );
  }

  async loginCompleted() {
    const me = await Providers.globalProvider.graph.client.api('me').get();
    this.userLoggedIn.emit(me);
  }

  hangup() {
    this.callVisible = false;
  }

  openChatHelp() {
    if (this.featureFlags.byodEnabled) {
        // Open the dialog
        const dialogRef = this.dialog.open(ChatHelpDialogComponent);

        // Subscribe to the dialog afterClosed observable to get the dialog result
        this.subscription.add(
            dialogRef.afterClosed().subscribe(response => {
                console.log('Chat Help dialog closed:', response);
            })
        );
    }
    else {
        alert('No phone number available.');
    }
}

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
