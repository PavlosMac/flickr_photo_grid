import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import { StickyHeaderComponent } from './components/sticky-header/sticky-header.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {LoaderInterceptorService} from './interceptors/loader-interceptor.service';
import { LoginComponent } from './components/login/login.component';
import {AuthModule} from '@auth0/auth0-angular';
import {environment} from '../environments/environment';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    StickyHeaderComponent,
  ],
  providers: [
    {
    provide: HTTP_INTERCEPTORS,
    useClass: LoaderInterceptorService,
    multi: true
  }
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    AppRoutingModule,
    AuthModule.forRoot({
      clientId: environment.auth0Client,
      domain: environment.auth0Domain,
      redirectUri: environment.redirectUri,
      errorPath: environment.auth0ErrorPath,
      httpInterceptor: {
        allowedList: ['*'],
      },
    }),
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
