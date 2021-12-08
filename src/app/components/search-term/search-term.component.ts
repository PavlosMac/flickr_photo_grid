import {Component, OnDestroy, OnInit, EventEmitter, Output, ChangeDetectionStrategy} from '@angular/core';
import {FormControl} from '@angular/forms';
import {OnDestroyMixin, untilComponentDestroyed} from '@w11k/ngx-componentdestroyed';
import {debounceTime, filter, map} from 'rxjs/operators';
import {AuthService} from '@auth0/auth0-angular';

@Component({
  selector: 'search-term',
  templateUrl: './search-term.component.html',
  styleUrls: ['./search-term.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SearchTermComponent extends OnDestroyMixin implements OnInit, OnDestroy {
  searchInput = new FormControl('');
  @Output() outputTerm = new EventEmitter<string>();

  constructor(public auth0: AuthService) {
    super();
  }

  ngOnInit(): void {
    this.searchInput.valueChanges
      .pipe(untilComponentDestroyed(this),
        map((value: string) => value && value.trim()),
        filter((value) => !!value),
        debounceTime(500)).subscribe(t => {
      this.outputTerm.emit(t);
    });
  }

  onLogout() {
    this.auth0.logout();
  }
}
