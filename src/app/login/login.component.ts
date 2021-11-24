import { Component } from '@angular/core';
import {AuthService} from '@auth0/auth0-angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {



  loading = false;

  constructor(private auth: AuthService) { }

  submit(): void {
    this.auth.loginWithRedirect();
  }

}
