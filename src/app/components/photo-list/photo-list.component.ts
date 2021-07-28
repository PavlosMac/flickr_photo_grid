import {Component, OnInit} from '@angular/core';
import {FormControl} from '@angular/forms';
import {debounceTime, filter, map, switchMap, tap} from 'rxjs/operators';
import {HttpClient} from '@angular/common/http';
import {BehaviorSubject} from 'rxjs';
import {PhotoConfig} from '../../models/photo-config';
import {FlickrApiService} from '../../services/flickr-api.service';
import {OnDestroyMixin, untilComponentDestroyed} from '@w11k/ngx-componentdestroyed';

@Component({
  selector: 'app-photo-list',
  templateUrl: './photo-list.component.html',
  styleUrls: ['./photo-list.component.css']
})
export class PhotoListComponent extends OnDestroyMixin implements OnInit {

  searchInput = new FormControl('');
  activePage = 1;
  photos: Array<PhotoConfig> = [];
  spinner = new BehaviorSubject(false);
  noContentTemplate = new BehaviorSubject(false);
  page = 1;
  currentTerm = '';
  throttle = 0;
  distance = 2;

  constructor(private http: HttpClient,
              private flickApi: FlickrApiService) {
    super();
  }

  ngOnInit(): void {
    this.searchInput.valueChanges
      .pipe(untilComponentDestroyed(this),
        map((value: string) => value && value.trim()),
        filter((value) => !!value),
        debounceTime(500),
        tap(_ => {
          this.noContentTemplate.next(false);
          this.spinner.next(true);
        }),
        switchMap((term) => {
          this.currentTerm = term;
          return this.flickApi.doPhotosReq(term, 'flickr.photos.search', this.page);
        })).subscribe(res => {
      if (!res.photos.pages) {
        this.noContentTemplate.next(true);
      }
      this.photos = this.flickApi.mapPhotos(res.photos.photo);
      this.spinner.next(false);
    });
  }

  onScroll(): void {
    this.spinner.next(true);
    this.flickApi.doPhotosReq(this.currentTerm, 'flickr.photos.search', ++this.page).subscribe(res => {
      this.photos.push(...this.flickApi.mapPhotos(res.photos.photo));
      this.spinner.next(false);
    });
  }
}
