import { Component, inject } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { NavigationService } from '../../services/navigation.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [ButtonModule],
  templateUrl: './home.component.html'
})
export class HomeComponent {
  private readonly router = inject(Router);
  private readonly activeRoute = inject(ActivatedRoute);
  private readonly navigationService = inject(NavigationService)
  navigateToDetails() {
    this.navigationService.navigate(this.router, this.activeRoute, 'detail');
  }
}
