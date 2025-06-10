import { APP_INITIALIZER, importProvidersFrom } from '@angular/core';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideRouter, Router } from '@angular/router';
import { bootstrapRemoteComponent } from '@onecx/angular-webcomponents';
import { AppEntrypointComponent } from './app/app-entrypoint.component';
import { environment } from './environments/environment.development';

import {
  HttpClient,
  provideHttpClient,
  withInterceptorsFromDi,
} from '@angular/common/http';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { AngularAuthModule } from '@onecx/angular-auth';
import {
  addInitializeModuleGuard,
  AppStateService,
} from '@onecx/angular-integration-interface';
import {
  createTranslateLoader,
  provideAngularUtils,
  TRANSLATION_PATH,
  translationPathFactory,
} from '@onecx/angular-utils';
import { initializeRouter } from '@onecx/angular-webcomponents';
import { remoteRoutes } from './app/app.routes';

export const commonProviders = [
  provideHttpClient(withInterceptorsFromDi()),
  provideAnimationsAsync(),
  importProvidersFrom(AngularAuthModule),
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
  provideAngularUtils({
    contentType: 'microfrontend',
  }),
];

bootstrapRemoteComponent(
  AppEntrypointComponent,
  'onecx-standalone-components-example',
  environment.isProduction,
  [
    ...commonProviders,
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
  ]
);
