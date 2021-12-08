import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {PhotoDetailComponent} from './components/photo-detail/photo-detail.component';
import {GridContainerComponent} from './grid-container/grid-container.component';
import {LoginComponent} from './login/login.component';
import {ErrorComponent} from './app/components/error/error.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'photo-search',
    pathMatch: 'full',
  },
  {
    path: 'login',
    pathMatch: 'full',
    component: LoginComponent,
  },
  {
    path: 'photo-search',
    component: GridContainerComponent,
  },
  {
    path: 'photo-detail/:id/:title',
    component: PhotoDetailComponent
  },
  {
    path: 'error',
    component: ErrorComponent
  },
  {
    path: '**',
    redirectTo: 'photo-search',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {enableTracing: true})],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
