import {Component, OnDestroy, OnInit, EventEmitter, Output, ChangeDetectionStrategy} from '@angular/core';
import {FormControl} from '@angular/forms';
import {OnDestroyMixin, untilComponentDestroyed} from '@w11k/ngx-componentdestroyed';
import {debounceTime, filter, map, withLatestFrom} from 'rxjs/operators';
import {AuthService} from '@auth0/auth0-angular';
import {NavigationEnd, Router} from '@angular/router';
import {BehaviorSubject} from 'rxjs';

@Component({
  selector: 'search-term',
  templateUrl: './search-term.component.html',
  styleUrls: ['./search-term.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SearchTermComponent extends OnDestroyMixin implements OnInit, OnDestroy {
  searchInput = new FormControl('');
  @Output() outputTerm = new EventEmitter<string>();
  nextSearch = new BehaviorSubject<boolean>(false);
  constructor(public auth0: AuthService, private router: Router) {
    super();
  }

  ngOnInit(): void {
    this.nextSearch.asObservable().pipe(untilComponentDestroyed(this),
      withLatestFrom(this.router.events),
      map(([_, b]) => b),
      filter(evt => evt instanceof NavigationEnd),
      // @ts-ignore
    ).subscribe((event: NavigationEnd) => {
      if (new RegExp('/photo-search/grid/photo-detail').test(event.url)) {
        this.router.navigate(['']);
      }
    });
    this.searchInput.valueChanges
      .pipe(untilComponentDestroyed(this),
        map((value: string) => value && value.trim()),
        filter((value) => !!value),
        debounceTime(500)).subscribe(t => {
      this.outputTerm.emit(t);
      this.nextSearch.next(true);
    });
  }

  onLogout() {
    this.auth0.logout();
  }
}
