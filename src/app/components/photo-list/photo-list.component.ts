import {Component, Input} from '@angular/core';
import {PhotoConfig} from '../../models/photo-config';
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
}
