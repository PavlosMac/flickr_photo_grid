import {AfterViewInit, ChangeDetectionStrategy, Component, ElementRef, EventEmitter, Input, Output, ViewChild} from '@angular/core';
import {OnDestroyMixin, untilComponentDestroyed} from '@w11k/ngx-componentdestroyed';
//  element specifies where to project content inside a component template.
@Component({
  selector: 'c-infinite-scroll',
  template: `<ng-content></ng-content><div #anchor></div>`,
  styleUrls: ['./infinite-scroll.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class InfiniteScrollComponent extends OnDestroyMixin implements AfterViewInit {
  @Output() scrolled = new EventEmitter();
  @ViewChild('anchor') anchor: ElementRef<HTMLElement> | undefined;
  private observer: IntersectionObserver | undefined;

  constructor(private host: ElementRef) {super(); }

  get element() {
    return this.host.nativeElement;
  }
  /*
  * Use options to configure the threshold - introduce an element using the hosts element reference
  * */
  ngAfterViewInit() {

    this.scrolled.pipe(untilComponentDestroyed(this)).subscribe(() => {
    })
    /*
    * root is the container (ng-content), check if area is scrollable, if true use the host element as root ( target )
    * */
    const options = {
      root: this.isHostScrollable() ? this.host.nativeElement : null
    };

    this.observer = new IntersectionObserver(([entry]) => {
      entry.isIntersecting && this.scrolled.emit();
    }, options);
    // @ts-ignore
    this.observer.observe(this.anchor.nativeElement);
  }

  private isHostScrollable() {
    const style = window.getComputedStyle(this.element);
    return style.getPropertyValue('overflow') === 'auto' ||
      style.getPropertyValue('overflow-y') === 'scroll';
  }
}
