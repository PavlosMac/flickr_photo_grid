import {Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FlickrDataService {
  spinner = new BehaviorSubject(false);
}
