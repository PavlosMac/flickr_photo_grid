import {Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs';
import {PhotoConfig} from '../models/photo-config';

@Injectable({
  providedIn: 'root'
})
export class FlickrDataService {
  spinner = new BehaviorSubject<boolean>(false);
  term = new BehaviorSubject<string>('');
  noContentTemplate = new BehaviorSubject(false);
  photos = new BehaviorSubject<Array<PhotoConfig>>([]);
  photoPage = 0;
}
