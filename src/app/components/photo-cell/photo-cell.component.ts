import {Component, Input} from '@angular/core';

@Component({
  selector: 'photo-cell',
  styleUrls: ['photo-cell.css'],
  template: `
    <!--      <div class="cardz" style="width: 20rem;">-->
    <div id="cardz">
      <div [ngbPopover]="spanPopContent"
           triggers="mouseenter:mouseleave"
           [container]="'body'"
           [popoverTitle]="spanPopTitle"
           placement="bottom"
      >
        <img [src]="url" [style]="{width: width, height: height}" [alt]="title"/>
        <!--      <div class="card-body">-->
        <!--        <h5 class="card-title">{{ title }}</h5>-->
        <!--        <hr>-->
        <!--        <a [routerLink]="['../photo-detail', photoId, title]" styles="color:#A7C7E7">See detail</a>-->
        <!--      </div>-->
      </div>

      <ng-template #spanPopTitle>
        <div class="d-flex align-items-center">
          <span> {{ title }} </span>
          <p class="font-size-lg py-0 my-0">detail off title</p>
        </div>
      </ng-template>

      <ng-template #spanPopContent>
        <p class="font-weight-bold pb-0">
          <span> some data </span>
        </p>
        <p class="font-weight-bold pb-0">
          Probability: <span>Some data</span>
        </p>

      </ng-template>
    </div>
  `,
})
export class PhotoCellComponent {
  @Input() url = '';
  @Input() title = '';
  @Input() photoId = '';
  @Input() height = '';
  @Input() width = '';

}

