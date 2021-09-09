import {AfterViewInit, ChangeDetectionStrategy, Component, HostBinding, NgZone, OnInit} from '@angular/core';
import {fromEvent} from 'rxjs';
import {distinctUntilChanged, filter, map, pairwise, share, tap, throttleTime} from 'rxjs/operators';
import {animate, state, style, transition, trigger} from '@angular/animations';
import {FlickrDataService} from '../../services/flickr-data.service';

enum VisibilityState {
  Visible = 'visible',
  Hidden = 'hidden'
}

enum Direction {
  Up = 'Up',
  Down = 'Down'
}
@Component({
  selector: 'app-sticky-header',
  template: `<ng-content></ng-content>`,
  styleUrls: ['sticky-header.css'],
  animations: [
    trigger('toggle', [
      state(
        VisibilityState.Hidden,
        style({ opacity: 0, transform: 'translateY(-100%)' })
      ),
      state(
        VisibilityState.Visible,
        style({ opacity: 1, transform: 'translateY(0)' })
      ),
      transition('* => *', animate('200ms ease-in'))
    ])
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class StickyHeaderComponent implements AfterViewInit {
  private isVisible = false;

  @HostBinding('@toggle')
  get toggle(): VisibilityState {
    return this.isVisible ? VisibilityState.Visible : VisibilityState.Hidden;
  }
  constructor(private flickrData: FlickrDataService) { }

  ngAfterViewInit() {
    // @ts-ignore
    const scroll$ = fromEvent(window, 'scroll')
      .pipe(
        throttleTime(15),
        map( _ => window.pageYOffset),
        tap( res => this.isVisible = (!res)),
        pairwise(),
        map(([y1, y2]): Direction => (y2 < y1 ? Direction.Up : Direction.Down)),
        distinctUntilChanged(),
        share()
    );

    const goingUp$ = scroll$.pipe(
      filter(direction => direction === Direction.Up)
    );

    const goingDown$ = scroll$.pipe(
      tap((res) => console.log('going down ', res)),
      filter(direction => direction === Direction.Down)
    );

    goingUp$.subscribe((res) => {
      this.isVisible = true;
    });

    goingDown$.subscribe((res) => {
      this.isVisible = false;
      console.log(this.isVisible);
    });

    this.flickrData.stickerVisibility.subscribe(v => this.isVisible = v);
  }
}
