import {ChangeDetectionStrategy, Component} from '@angular/core';
import {AuthService} from '@auth0/auth0-angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LoginComponent {

  loading = false;

  constructor(private auth: AuthService) { }

  submit(): void {
    this.auth.loginWithRedirect();
  }

}
