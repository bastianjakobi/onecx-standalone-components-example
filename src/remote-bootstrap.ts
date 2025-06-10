import {
  APP_INITIALIZER,
  importProvidersFrom,
  provideZoneChangeDetection,
} from '@angular/core';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideRouter, Router, Routes } from '@angular/router';
import {
  bootstrapModule,
  bootstrapRemoteComponent,
} from '@onecx/angular-webcomponents';
import Nora from '@primeng/themes/nora';
import { providePrimeNG } from 'primeng/config';
import { environment } from './environments/environment.development';
import { AppEntrypointComponent } from './app/app-entrypoint.component';

import {
  HttpClient,
  provideHttpClient,
  withInterceptorsFromDi,
} from '@angular/common/http';
import {
  addInitializeModuleGuard,
  AppStateService,
} from '@onecx/angular-integration-interface';
import { initializeRouter, startsWith } from '@onecx/angular-webcomponents';
import { DetailComponent } from './app/pages/detail/detail.component';
import { HomeComponent } from './app/pages/home/home.component';
import {
  createTranslateLoader,
  provideAngularUtils,
  TRANSLATION_PATH,
  translationPathFactory,
} from '@onecx/angular-utils';
import { AngularAuthModule } from '@onecx/angular-auth';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';

export const remoteRoutes: Routes = [
  {
    matcher: startsWith(''),
    component: HomeComponent,
  },
  {
    matcher: startsWith('detail'),
    component: DetailComponent,
  },
];

bootstrapRemoteComponent(
  AppEntrypointComponent,
  'onecx-standalone-components-example',
  environment.isProduction,
  [
    provideHttpClient(withInterceptorsFromDi()),
    provideAnimationsAsync(),
    importProvidersFrom(AngularAuthModule),
    providePrimeNG({
      theme: {
        preset: Nora,
      },
    }),
    importProvidersFrom(
      TranslateModule.forRoot({
        isolate: false,
        loader: {
          provide: TranslateLoader,
          useFactory: createTranslateLoader,
          deps: [HttpClient],
        },
      })
    ),
    provideRouter(addInitializeModuleGuard(remoteRoutes)),
    {
      provide: APP_INITIALIZER,
      useFactory: initializeRouter,
      multi: true,
      deps: [Router, AppStateService],
    },
    {
      provide: TRANSLATION_PATH,
      useFactory: (appStateService: AppStateService) =>
        translationPathFactory('assets/i18n/')(appStateService),
      multi: true,
      deps: [AppStateService],
    },
    provideAngularUtils({ contentType: 'microfrontend' }),
  ]
);
