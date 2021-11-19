import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {PhotoDetailComponent} from './components/photo-detail/photo-detail.component';
import {GridContainerComponent} from './grid-container/grid-container.component';
import {LoginComponent} from './login/login.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  },
  {
    path: 'login',
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
  // {
  //   path: '**',
  //   redirectTo: 'photo-search',
  //   pathMatch: 'full'
  // }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
