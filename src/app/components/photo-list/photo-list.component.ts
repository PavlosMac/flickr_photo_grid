import {Component, Input, EventEmitter, Output} from '@angular/core';
import {FormControl} from '@angular/forms';
import {concatMap, debounceTime, filter, finalize, map, mergeMap, switchMap, tap} from 'rxjs/operators';
import {HttpClient} from '@angular/common/http';
import {PhotoConfig} from '../../models/photo-config';
import {FlickrApiService} from '../../services/flickr-api.service';
import {OnDestroyMixin} from '@w11k/ngx-componentdestroyed';
import {FlickrDataService} from '../../services/flickr-data.service';
import {BehaviorSubject} from 'rxjs';

@Component({
  selector: 'app-photo-list',
  templateUrl: './photo-list.component.html',
  styleUrls: ['./photo-list.component.css']
})
export class PhotoListComponent{
  activePage = 1;
  spinner = new BehaviorSubject(false);
  @Input() photosForGrid: PhotoConfig[] | undefined;

  // @Output() doScroll = new EventEmitter()

  // onScroll() {
  //   console.log('scrolled');
  //   this.doScroll.emit(true)
  // }
}
