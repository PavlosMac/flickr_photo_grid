import { PhotoListComponent } from './photo-list.component';
import {createComponentFactory, Spectator} from '@ngneat/spectator';
import {HttpClient} from '@angular/common/http';
import {InfiniteScrollModule} from 'ngx-infinite-scroll';
import {RouterModule} from '@angular/router';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

describe('PhotoListComponent', () => {
  let spectator: Spectator<PhotoListComponent>;
  const createComponent = createComponentFactory({
    imports: [InfiniteScrollModule, RouterModule, FormsModule, ReactiveFormsModule],
    component: PhotoListComponent,
    mocks: [HttpClient]
  });


  beforeEach(() => {
    spectator = createComponent()
  });

  it('should create', (done) => {
    const input = spectator.query('input') as Element;
    spectator.typeInElement('some tricky keywords', input);

    spectator.fixture.detectChanges();
    spectator.fixture.whenStable().then(_ => {
      done();
      expect(spectator.component.spinner.value).toBeTrue();
    })
  });
});
