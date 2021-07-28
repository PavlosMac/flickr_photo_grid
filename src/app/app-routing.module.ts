import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {PhotoListComponent} from './components/photo-list/photo-list.component';
import {PhotoDetailComponent} from './components/photo-detail/photo-detail.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'photo-search',
    pathMatch: 'full',
  },
  {
    path: 'photo-search',
    component: PhotoListComponent,
  },
  {
    path: 'photo-detail/:id/:title',
    component: PhotoDetailComponent
  },
  {
    path: '**',
    redirectTo: 'photo-search',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
