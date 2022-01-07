import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule, Routes} from '@angular/router';
import {GridContainerComponent} from '../components/grid-container/grid-container.component';
import {PhotoDetailComponent} from '../components/photo-detail/photo-detail.component';
import {PhotoListComponent} from '../components/photo-list/photo-list.component';
import {PhotoCellComponent} from '../components/photo-cell/photo-cell.component';
import {SearchTermComponent} from '../components/search-term/search-term.component';
import {InfiniteScrollComponent} from '../infinite-scroll/infinite-scroll.component';
import {GlobalSpinnerComponent} from '../global-spinner/global-spinner.component';
import {FontAwesomeModule} from '@fortawesome/angular-fontawesome';
import {NgxScrollTopModule} from 'ngx-scrolltop';
import {InfiniteScrollModule} from 'ngx-infinite-scroll';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {PhotoMillComponent} from '../components/photo-mill/photo-mill.component';
import {WelcomeComponent} from '../components/welcome/welcome.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'grid/welcome',
    pathMatch: 'full',
  },
  {
    path: 'grid',
    component: GridContainerComponent,
    children: [
      {
        path: 'mill',
        component: PhotoMillComponent
      },
      {
        path: 'photo-detail/:id/:title',
        component: PhotoDetailComponent
      },
      {
        path: 'welcome',
        component: WelcomeComponent
      },
    ]
  },
  {
    path: '**',
    redirectTo: 'photo-search',
    pathMatch: 'full'
  }
];


@NgModule({
  declarations: [
    PhotoDetailComponent,
    PhotoListComponent,
    PhotoCellComponent,
    SearchTermComponent,
    GridContainerComponent,
    InfiniteScrollComponent,
    GlobalSpinnerComponent,
    PhotoMillComponent,
  ],
  imports: [
    NgxScrollTopModule,
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    FontAwesomeModule,
    NgxScrollTopModule,
    InfiniteScrollModule,
    NgbModule,
    RouterModule.forChild(routes)
  ]
})
export class PhotoModule { }
