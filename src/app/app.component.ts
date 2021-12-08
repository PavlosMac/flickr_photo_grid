import { Component } from '@angular/core';
import {FlickrDataService} from './services/flickr-data.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  constructor(public flickrData: FlickrDataService) {}
}
