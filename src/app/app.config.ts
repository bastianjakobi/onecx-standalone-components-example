import {
  ApplicationConfig,
  importProvidersFrom,
  provideZoneChangeDetection,
} from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { providePrimeNG } from 'primeng/config';
import Nora from '@primeng/themes/nora';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import {
  createTranslateLoader,
  provideAngularUtils,
} from '@onecx/angular-utils';
import { routes } from './app.routes';
import {
  HttpClient,
  provideHttpClient,
  withInterceptorsFromDi,
} from '@angular/common/http';
import { addInitializeModuleGuard } from '@onecx/angular-integration-interface';
import { AngularAuthModule } from '@onecx/angular-auth';
import {
  provideStandaloneProviders
} from '@onecx/standalone-shell';

export const appConfig: ApplicationConfig = {
  providers: [
    provideHttpClient(withInterceptorsFromDi()),
    provideAnimationsAsync(),
    importProvidersFrom(AngularAuthModule),
    providePrimeNG({
      theme: {
        preset: Nora,
      },
    }),
    importProvidersFrom([
      TranslateModule.forRoot({
        isolate: false,
        loader: {
          provide: TranslateLoader,
          useFactory: createTranslateLoader,
          deps: [HttpClient],
        },
      }),
    ]),
    provideStandaloneProviders(),
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(addInitializeModuleGuard(routes)),
    provideAngularUtils({ contentType: 'microfrontend' }),
  ],
};
