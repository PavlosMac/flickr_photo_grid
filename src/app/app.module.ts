import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PhotoListComponent } from './components/photo-list/photo-list.component';
import { PhotoCellComponent } from './components/photo-cell/photo-cell.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import {ReactiveFormsModule} from '@angular/forms';
import {PhotoDetailComponent} from './components/photo-detail/photo-detail.component';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {InfiniteScrollModule} from 'ngx-infinite-scroll';
import { StickyHeaderComponent } from './components/sticky-header/sticky-header.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { SearchTermComponent } from './components/search-term/search-term.component';
import { GridContainerComponent } from './grid-container/grid-container.component';
import { NgxScrollTopModule } from 'ngx-scrolltop';
import {FontAwesomeModule} from '@fortawesome/angular-fontawesome';
import {InfiniteScrollComponent} from './infinite-scroll/infinite-scroll.component';
import {LoaderInterceptorService} from './interceptors/loader-interceptor.service';
import {GlobalSpinnerComponent} from './global-spinner/global-spinner.component';
import { LoginComponent } from './login/login.component';
import {AuthModule} from '@auth0/auth0-angular';
import {environment} from '../environments/environment';

@NgModule({
  declarations: [
    AppComponent,
    PhotoDetailComponent,
    PhotoListComponent,
    PhotoCellComponent,
    StickyHeaderComponent,
    SearchTermComponent,
    GridContainerComponent,
    InfiniteScrollComponent,
    GlobalSpinnerComponent,
    LoginComponent
  ],
  providers: [
    {
    provide: HTTP_INTERCEPTORS,
    useClass: LoaderInterceptorService,
    multi: true
  }
  ],
  imports: [
    FontAwesomeModule,
    NgxScrollTopModule,
    BrowserAnimationsModule,
    InfiniteScrollModule,
    HttpClientModule,
    ReactiveFormsModule,
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    NgxScrollTopModule,
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
