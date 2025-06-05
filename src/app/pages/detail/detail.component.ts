import { Component, inject } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { NavigationService } from '../../services/navigation.service';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { PortalMessageService } from '@onecx/angular-integration-interface';

@Component({
  selector: 'app-detail',
  standalone: true,
  imports: [ButtonModule, TranslateModule],
  templateUrl: './detail.component.html'
})
export class DetailComponent {
  private readonly router = inject(Router);
  private readonly activeRoute = inject(ActivatedRoute);
  private readonly navigationService = inject(NavigationService)
  private readonly portalMessageService = inject(PortalMessageService);
  navigateToHome() {
    this.navigationService.navigate(this.router, this.activeRoute, '../');
  }
    showPortalMessage() {
    this.portalMessageService.info({
      summaryKey: 'MESSAGE.SUMMARY',
      summaryParameters: { name: 'Detail Page' },
      detailKey: 'MESSAGE.DETAIL',
    })
  }
}
