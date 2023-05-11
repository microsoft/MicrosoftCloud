import { ApplicationRef, Component, ComponentRef, EnvironmentInjector, OnDestroy, OnInit, createComponent, inject } from '@angular/core';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';
import { FeatureFlagsService } from './core/feature-flags.service';
import { GraphService } from './core/graph.service';
import { Customer } from './shared/interfaces';
import { PEOPLE_ICON, FILE_ICON, CHAT_ICON, EMAIL_ICON, AGENDA_ICON, PHONE_ICON, CONTENT_ICON, SEARCH_ICON, RESET_ICON, CONTACT_ICON, SMS_ICON } from './shared/svg-icons';
import { RouterOutlet } from '@angular/router';
import { OverlayComponent } from './core/overlay/overlay.component';
import { RelatedContentComponent } from './related-content/related-content.component';
import { CustomersListComponent } from './customers-list/customers-list.component';
import { NgIf } from '@angular/common';
import { HeaderComponent } from './header/header.component';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
    standalone: true,
    imports: [HeaderComponent, NgIf, CustomersListComponent, RelatedContentComponent, OverlayComponent, RouterOutlet]
})
export class AppComponent implements OnInit, OnDestroy {
  get loggedIn() {
    return this.graphService.loggedIn();
  }
  name = '';
  signInMessage = '';
  selectedCustomer: Customer | null = null;
  timer: NodeJS.Timeout | null = null;
  iconList = [ 
    { name: 'people', icon: PEOPLE_ICON }, 
    { name: 'file', icon: FILE_ICON }, 
    { name: 'chat', icon: CHAT_ICON },
    { name: 'email', icon: EMAIL_ICON }, 
    { name: 'agenda', icon: AGENDA_ICON }, 
    { name: 'phone', icon: PHONE_ICON },
    { name: 'content', icon: CONTENT_ICON }, 
    { name: 'search', icon: SEARCH_ICON },
    { name: 'reset', icon: RESET_ICON }, 
    { name: 'contact', icon: CONTACT_ICON }, 
    { name: 'sms', icon: SMS_ICON }
  ];
  relatedContentComponentRef?: ComponentRef<RelatedContentComponent>;

  injector = inject(EnvironmentInjector);
  appRef = inject(ApplicationRef);
  graphService = inject(GraphService);
  iconRegistry = inject(MatIconRegistry);
  sanitizer = inject(DomSanitizer);
  featureFlags = inject(FeatureFlagsService);

  async ngOnInit() {
    for (const item of this.iconList) {
      this.iconRegistry.addSvgIconLiteral(item.name, this.sanitizer.bypassSecurityTrustHtml(item.icon));
    }
    this.graphService.init();

    // Update the signInMessage property after 800ms
    // Option 1: of('Please sign in to continue').pipe(delay(800)).subscribe((msg: string) => this.signInMessage = msg);
    // Option 2 (yes...opting for simplicity):
    this.timer = setTimeout(() => this.signInMessage = 'Please sign in to continue', 800);
  }

  customerSelected(customer: Customer) {
    this.selectedCustomer = { ...customer };
    this.loadRelatedContentComponent();
  }

  async loadRelatedContentComponent() {
    if (!this.relatedContentComponentRef) {
      const { RelatedContentComponent } = await import('./related-content/related-content.component');
      this.relatedContentComponentRef = createComponent(RelatedContentComponent, { 
        hostElement: document.getElementById('related-content')!, 
        environmentInjector: this.injector 
      });
      this.appRef.attachView(this.relatedContentComponentRef.hostView);
    }

    this.relatedContentComponentRef.setInput('selectedCustomer', this.selectedCustomer);
  }

  userLoggedIn(user: { displayName: string}) {
    this.name = user.displayName;
  }

  ngOnDestroy() {
    if (this.timer) {
      clearTimeout(this.timer);
    }
  }
}
