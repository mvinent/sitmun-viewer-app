import { LOCALE_ID, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthorizedLayoutComponent } from './layout/authorized-layout/authorized-layout.component';
import { NavigationBarComponent } from './layout/navigation-bar/navigation-bar.component';
import { PublicLayoutComponent } from './layout/public-layout/public-layout.component';
import { FooterComponent } from './layout/footer/footer.component';
import { AuthenticationModule } from '@auth/auth.module';
import { UiModule } from '@ui/ui.module';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import {
  AUTH_CONFIG_DI,
  AUTH_DETAILS_SERVICE_DI
} from '@auth/authentication.options';
import { UserService } from '@api/services/user.service';
import { CustomAuthConfig } from '@config/app.config';
import { AuthorizedNavigationBarComponent } from './layout/authorized-navigation-bar/authorized-navigation-bar/authorized-navigation-bar.component';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { TestModalComponent } from '@sections/common/modals/test-modal/test-modal.component';
import { DashboardModalComponent } from '@sections/common/modals/dashboard-modal/dashboard-modal.component';

@NgModule({
  declarations: [
    AppComponent,
    AuthorizedLayoutComponent,
    NavigationBarComponent,
    AuthorizedNavigationBarComponent,
    PublicLayoutComponent,
    FooterComponent,
    TestModalComponent,
    DashboardModalComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AuthenticationModule,
    UiModule,
    HttpClientModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    })
  ],
  providers: [
    { provide: LOCALE_ID, useValue: 'es-ES' },
    { provide: AUTH_CONFIG_DI, useValue: CustomAuthConfig },
    { provide: AUTH_DETAILS_SERVICE_DI, useClass: UserService }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}

export function HttpLoaderFactory(http: HttpClient): TranslateHttpLoader {
  return new TranslateHttpLoader(http);
}