import {
  ApplicationConfig,
  importProvidersFrom,
  provideZoneChangeDetection,
} from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import {
  createTranslateLoader,
  provideAngularUtils,
} from '@onecx/angular-utils';
import { standaloneRoutes } from './app.routes';
import {
  HttpClient,
  provideHttpClient,
  withInterceptorsFromDi,
} from '@angular/common/http';
import { addInitializeModuleGuard } from '@onecx/angular-integration-interface';
import { AngularAuthModule } from '@onecx/angular-auth';
import { provideStandaloneProviders } from '@onecx/standalone-shell';
import { commonProviders } from '../remote-bootstrap';

export const appConfig: ApplicationConfig = {
  providers: [
    ...commonProviders,
    provideStandaloneProviders(),
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(addInitializeModuleGuard(standaloneRoutes)),
  ],
};
