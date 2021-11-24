import {Component} from '@angular/core';
import {LoaderService} from '../services/loader.service';

@Component({
  selector: 'global-spinner',
  template: `
    <div class="progress-loader" [hidden]="!(loaderService.isLoading | async)">
      <div class="spinner-grow text-info" style="width: 2rem; height: 2rem;" role="status">
        <span class="sr-only">Loading...</span>
      </div>
    </div>`,
  styleUrls: ['./global-spinner.component.scss']
})
export class GlobalSpinnerComponent {
  constructor(public loaderService: LoaderService) {
  }
}
