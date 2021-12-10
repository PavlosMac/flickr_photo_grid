import {ChangeDetectionStrategy, Component, Input} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'photo-cell',
  styleUrls: ['photo-cell.scss'],
  template: `
    <div id="cardz">
      <div (click)="onClickImage()"
           [ngbPopover]="spanPopContent"
           triggers="mouseenter:mouseleave"
           [container]="'body'"
           [popoverTitle]="spanPopTitle"
           placement="bottom"
      >
        <img [src]="url" [style]="{width: width, height: height}" [alt]="title"/>
      </div>
        <ng-template #spanPopTitle>
          <div class="d-flex align-items-center">
            <span> {{ title }} </span>
          </div>
        </ng-template>
        <ng-template #spanPopContent>
          <p class="font-weight-bold pb-0">
            <span> click on photo for detail </span>
          </p>
        </ng-template>
      </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PhotoCellComponent {
  @Input() url = '';
  @Input() title = '';
  @Input() photoId = '';
  @Input() height = '';
  @Input() width = '';

  constructor(private router: Router, private route: ActivatedRoute) {
  }

  onClickImage(): void {
    this.router.navigate(['./photo-detail', this.photoId, this.title], {relativeTo: this.route.parent});
  }
}

