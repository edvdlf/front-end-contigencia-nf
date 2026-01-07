import { ApplicationConfig, importProvidersFrom, provideBrowserGlobalErrorListeners, provideZonelessChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideClientHydration, withEventReplay } from '@angular/platform-browser';

import { HTTP_INTERCEPTORS, provideHttpClient, withFetch, withInterceptors, withInterceptorsFromDi } from '@angular/common/http';
import { ConfirmationService, MessageService } from 'primeng/api';
import { CookieService } from 'ngx-cookie-service';

import { provideAnimations } from '@angular/platform-browser/animations';
import { providePrimeNG } from 'primeng/config';
import {} from './core/interceptors/auth.interceptor'

import { VetorItPreset } from './vetorit.preset';

import { DialogService, DynamicDialogModule } from 'primeng/dynamicdialog';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { localePtBr } from './shared/locales/calendar-locale';
import { AuthInterceptor } from './core/interceptors/auth.interceptor';

export const appConfig: ApplicationConfig = {
  providers: [
    provideAnimations(),
     providePrimeNG({
      
      theme: {
        preset: VetorItPreset,
        options: { darkModeSelector: '.app-dark' },
      },
      ripple: true, 
      translation: localePtBr,
    }),
    //provideHttpClient(
      //withFetch(),
      //withInterceptors([AuthInterceptor])
    //),

    provideHttpClient(
      withFetch(),
      withInterceptorsFromDi()
    ),

    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },


     importProvidersFrom(DynamicDialogModule,
      ConfirmDialogModule
     ),
    DialogService,
    provideBrowserGlobalErrorListeners(),
    provideZonelessChangeDetection(),
    provideRouter(routes), provideClientHydration(withEventReplay()),
    ConfirmationService,
    MessageService,
    CookieService,
    
  ]
};
