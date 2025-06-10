import { Component, inject } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { NavigationService } from '../../services/navigation.service';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { PortalMessageService } from '@onecx/angular-integration-interface';
import { PortalPageComponent } from '@onecx/angular-utils';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [ButtonModule, TranslateModule, PortalPageComponent],
  templateUrl: './home.component.html'
})
export class HomeComponent {
  private readonly router = inject(Router);
  private readonly activeRoute = inject(ActivatedRoute);
  private readonly navigationService = inject(NavigationService)
  private readonly portalMessageService = inject(PortalMessageService);
  constructor() {
    console.log('HomeComponent initialized');
  }
  navigateToDetails() {
    this.navigationService.navigate(this.router, this.activeRoute, 'detail');
  }
  showPortalMessage() {
    this.portalMessageService.info({
      summaryKey: 'MESSAGE.SUMMARY',
      summaryParameters: { name: 'Home Page' },
      detailKey: 'MESSAGE.DETAIL',
    })
  }
}
