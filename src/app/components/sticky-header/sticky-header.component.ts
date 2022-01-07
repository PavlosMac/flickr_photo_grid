import {AfterViewInit, ChangeDetectionStrategy, Component, HostBinding} from '@angular/core';
import {fromEvent} from 'rxjs';
import {distinctUntilChanged, map, pairwise, share, tap, throttleTime} from 'rxjs/operators';
import {animate, state, style, transition, trigger} from '@angular/animations';
import {OnDestroyMixin, untilComponentDestroyed} from '@w11k/ngx-componentdestroyed';

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
export class StickyHeaderComponent extends OnDestroyMixin implements AfterViewInit {
  private isVisible = false;

  @HostBinding('@toggle')
  get toggle(): VisibilityState {
    return this.isVisible ? VisibilityState.Visible : VisibilityState.Hidden;
  }

  constructor() {super() }
/*
* if 2nd yOffset is larger than 1ft then we are moving down
* */
  ngAfterViewInit() {
    // @ts-ignore
    const scroll$ = fromEvent(window, 'scroll')
      .pipe(
        throttleTime(15),
        map( _ => window.pageYOffset),
        pairwise(),
        map(([y1, y2]): [Direction, number] => (y1 > y2 ? [Direction.Up, y2] : [Direction.Down, y2])),
        distinctUntilChanged(),
        share()
    );

    scroll$.pipe(
      untilComponentDestroyed(this),
      tap((res) => {
        this.isVisible = res[1] > 150 && res[0] === Direction.Down;
      }),
    ).subscribe();
  }
}
