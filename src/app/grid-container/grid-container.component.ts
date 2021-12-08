import {ChangeDetectionStrategy, ChangeDetectorRef, Component, EventEmitter, Output} from '@angular/core';
import {BehaviorSubject} from 'rxjs';
import {FlickrDataService} from '../services/flickr-data.service';
import {FlickrApiService} from '../services/flickr-api.service';
import {PhotoConfig} from '../models/photo-config';
import {OnDestroyMixin, untilComponentDestroyed} from '@w11k/ngx-componentdestroyed';
import {faLongArrowAltUp} from '@fortawesome/free-solid-svg-icons';
import {tap} from 'rxjs/operators';
import {LoaderService} from '../services/loader.service';

@Component({
  selector: 'grid-container',
  templateUrl: './grid-container.component.html',
  styleUrls: ['./grid-container.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class GridContainerComponent extends OnDestroyMixin {
  page = 0;
  currentSearchT: string = '';
  noContentTemplate = new BehaviorSubject(false);
  photos: Array<PhotoConfig> = [];
  throttle = 0;
  distance = 2;

  faLongArrowAltUp = faLongArrowAltUp;

  @Output() searchWord = new EventEmitter<string>();

  constructor(private changeDetectorRef: ChangeDetectorRef,
              private flickrApiService: FlickrApiService,
              public loader: LoaderService,
              private flickrDataService: FlickrDataService,
  ) {
    super();
  }

  onTermOutput(event: string) {
    console.log("which event",event);
    if(!event) {
      return;
    }
    this.noContentTemplate.next(false);
    this.currentSearchT = event;
    this.flickrDataService.term.next(event);

    return this.flickrApiService.doPhotosReq(event, 'flickr.photos.search', this.page)
      .pipe(
        untilComponentDestroyed(this),
      ).subscribe(res => {
        if (!res.photos?.pages) {
          this.noContentTemplate.next(true);
        }
        this.photos = this.flickrApiService.mapPhotos(res.photos.photo);
        this.flickrDataService.spinner.next(false);
        ++this.page;
      });
  }

  onScroll(): void {
    if(this.page === 1 || !this.currentSearchT) {
      return
    }
    this.flickrApiService.doPhotosReq(this.currentSearchT, 'flickr.photos.search', ++this.page)
      .pipe(
        tap(() =>this.flickrDataService.spinner.next(true)))
      .subscribe(res => {
        if ((res as any).photos?.photo) {
          const photosWithSrc = this.flickrApiService.mapPhotos(res.photos.photo);
          this.photos = [...this.photos].concat(photosWithSrc);
          this.changeDetectorRef.detectChanges();
        }
      });
  }
}
