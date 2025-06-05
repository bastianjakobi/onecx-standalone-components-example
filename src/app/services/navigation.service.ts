import { Inject, Injectable } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Injectable({ providedIn: 'root' })
export class NavigationService {
  constructor() {}

  navigate(router: Router, activeRoute: ActivatedRoute, route: string) {
    router.navigate([route], { relativeTo: activeRoute });
  }
}
