import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {catchError} from 'rxjs/operators';
import {FlickrApiService} from '../../services/flickr-api.service';
import {BehaviorSubject, EMPTY, Observable} from 'rxjs';
import {HttpErrorResponse} from '@angular/common/http';

@Component({
  selector: 'photo-detail',
  templateUrl: './photo-detail.component.html',
  styleUrls: ['./photo-detail.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PhotoDetailComponent implements OnInit {
  url = '';
  author = '';
  username = '';
  title = '';
  size = 0;
  spinner = new BehaviorSubject(false);
  constructor(private flickApi: FlickrApiService,
              private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.spinner.next(true);
    const id = this.route.snapshot.paramMap.get('id') || '';
    this.flickApi.getPhotoDetail('flickr.photos.getInfo', id.toString())
      .pipe(
        catchError(err => this.handleError(err)),
      ).subscribe(res => {
      this.title = this.route.snapshot.paramMap.get('title') || '';
      this.author = res.photo.owner.realname;
      this.username = res.photo.owner.username;
      this.url = this.flickApi.mapPhoto(res.photo);
      this.spinner.next(false);
    });
  }

  handleError(err: HttpErrorResponse): Observable<never> {
    this.spinner.next(false);
    console.error(err);
    return EMPTY;
  }
}
