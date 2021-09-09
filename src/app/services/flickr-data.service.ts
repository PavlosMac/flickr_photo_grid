import {Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FlickrDataService {
  spinner = new BehaviorSubject<boolean>(false);
  term = new BehaviorSubject<string>('');
  stickerVisibility = new BehaviorSubject<boolean>(false);
}
