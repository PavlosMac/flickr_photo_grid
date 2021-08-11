import { PhotoListComponent } from './photo-list.component';
import {createComponentFactory, mockProvider, Spectator} from '@ngneat/spectator';
import {HttpClient} from '@angular/common/http';
import {InfiniteScrollModule} from 'ngx-infinite-scroll';
import {RouterModule} from '@angular/router';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {FlickrApiService} from '../../services/flickr-api.service';
import {of} from 'rxjs';

describe('PhotoListComponent', () => {
  let spectator: Spectator<PhotoListComponent>;

  const createComponent = createComponentFactory({
    imports: [InfiniteScrollModule, RouterModule, FormsModule, ReactiveFormsModule],
    component: PhotoListComponent,
    mocks: [HttpClient, FlickrApiService]
  });


  beforeEach(() => {
    spectator = createComponent({detectChanges: false})
  });

  it('should create set spinner off when keywords input', (done) => {
    spectator.fixture.detectChanges();
    const input = spectator.query('input') as Element;
    spectator.typeInElement('some tricky keywords', input);

    spectator.fixture.detectChanges();
    spectator.fixture.whenStable().then(_ => {
      done();
      expect(spectator.component.spinner.value).toBeTrue();
    })
  });

  it('should call doPhotosReq and mapPhotos in service when keywords are input', (done) => {
    const mockApiService = spectator.inject(FlickrApiService);
    mockApiService.doPhotosReq.and.returnValue(of({photos: {photo: 'mock src'}}));

    spectator.fixture.detectChanges();

    const input = spectator.query('input') as Element;
    spectator.typeInElement('some tricky keywords', input);

    spectator.fixture.detectChanges()
    spectator.fixture.whenStable().then(_ => {
      done();
      expect(mockApiService.doPhotosReq).toHaveBeenCalledWith('some tricky keywords', 'flickr.photos.search', 1);
      expect(mockApiService.mapPhotos).toHaveBeenCalledWith('mock src');
    })
  });

  it('should NOT call doPhotosReq service when keywords input is whitespace', (done) => {
    const mockApiService = spectator.inject(FlickrApiService);
    spectator.fixture.detectChanges();

    const input = spectator.query('input') as Element;
    spectator.typeInElement(' ', input);

    spectator.fixture.detectChanges();
    spectator.fixture.whenStable().then(_ => {
      done();
      expect(mockApiService.doPhotosReq).not.toHaveBeenCalled();
      expect(mockApiService.mapPhotos).not.toHaveBeenCalled();
    })
  });

});
