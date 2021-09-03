import {AfterViewInit, Component, HostBinding, Input, NgZone, OnInit, ViewChild} from '@angular/core';
import {fromEvent} from 'rxjs';
import {distinctUntilChanged, filter, map, pairwise, share, tap, throttleTime} from 'rxjs/operators';
import {animate, state, style, transition, trigger} from '@angular/animations';
import {ViewportScroller} from '@angular/common';

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
  styles: [
    `:host {
        position: fixed;
        top: 0;
        width: 100%;
      }`
  ],
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
  ]
})
export class StickyHeaderComponent implements OnInit, AfterViewInit {
  private isVisible = false;

  @HostBinding('@toggle')
  get toggle(): VisibilityState {
    return this.isVisible ? VisibilityState.Visible : VisibilityState.Hidden;
  }
  /*TODO https://netbasal.com/reactive-sticky-header-in-angular-12dbffb3f1d3*/
  constructor(private _ngZone: NgZone) { }

  ngOnInit(): void {
  }

  ngAfterViewInit() {
    const scroll$ = this._ngZone.runOutsideAngular(() => fromEvent(window, 'scroll')
      .pipe(
        throttleTime(10),
        map( _ => window.pageYOffset),
        tap(res => console.log(res)),
        tap(yOffSet => this.isVisible = !(yOffSet === 0)),
        pairwise(),
        map(([y1, y2]): Direction => (y2 < y1 ? Direction.Up : Direction.Down)),
        tap(res => console.log(res)),
        distinctUntilChanged(),
        share()
      )
    );

    const goingUp$ = scroll$.pipe(
      filter(direction => direction === Direction.Up)
    );

    const goingDown$ = scroll$.pipe(
      filter(direction => direction === Direction.Down)
    );

    goingUp$.subscribe(() => (this.isVisible = true));
    goingDown$.subscribe(() => (this.isVisible = false));
  }
}
