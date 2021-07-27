import {Component, Input} from '@angular/core';

@Component({
  selector: 'photo-cell',
  template: `
    <div class="card">
      <img class="card-img-top" [src]="url" [alt]="title"/>
      <div class="card-body">
        <h5 class="card-title">{{ title }}</h5>
        <p class="card-text">{{''}}</p>
        <hr>
        <p class="card-text">
          <small class="text-muted">{{ 'item.tags' }}</small>
        </p>
        <a [routerLink]="['../photo-detail', photoId, title]" class="btn btn-primary">Go somewhere</a>
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

