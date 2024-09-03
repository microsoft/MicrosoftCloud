import { Component, CUSTOM_ELEMENTS_SCHEMA, EventEmitter, inject, OnInit, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { EventBusService, Events } from '@core/eventbus.service';
import { FeatureFlagsService } from '@core/feature-flags.service';
import { Providers } from '@microsoft/mgt';
import { Phone } from '@shared/interfaces';
import { Subscription } from 'rxjs';
import { ChatHelpDialogComponent } from '../chat-help-dialog/chat-help-dialog.component';
import { PhoneCallComponent } from '../phone-call/phone-call.component';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss'],
    standalone: true,
    imports: [MatToolbarModule, MatIconModule, PhoneCallComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class HeaderComponent implements OnInit {

  @Output() userLoggedIn = new EventEmitter();
  callVisible = false;
  callData = {} as Phone;
  subscription = new Subscription();
  dialog = inject(MatDialog);
  eventBus = inject(EventBusService);
  featureFlags: FeatureFlagsService = inject(FeatureFlagsService);

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
