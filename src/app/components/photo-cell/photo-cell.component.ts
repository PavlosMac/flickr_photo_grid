import {Component, Input} from '@angular/core';

@Component({
  selector: 'photo-cell',
  template: `
    <div class="card">
      <img class="card-img-top" [src]="url" [alt]="title"/>
      <div class="card-body">
        <h5 class="card-title">{{ title }}</h5>
        <hr>
        <a [routerLink]="['../photo-detail', photoId, title]" styles="color:#A7C7E7">See detail</a>
      </div>
    </div>
  `,
  styleUrls: ['./photo-cell.component.css']
})
export class PhotoCellComponent
{
  @Input() url = '';
  @Input() title = '';
  @Input() photoId = '';
}

