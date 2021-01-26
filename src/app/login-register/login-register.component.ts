import {Component, OnInit} from '@angular/core';
import {AuthService} from '../shared/auth.service';

@Component({
  selector: 'app-login-register',
  templateUrl: './login-register.component.html',
  styleUrls: ['./login-register.component.scss']
})

export class LoginRegisterComponent implements OnInit {
  constructor(public authService: AuthService) {
  }

  email: string;
  password: string;
  isAdmin: boolean;

  ngOnInit(): void {
  }

  changeState(value: boolean) {
    this.isAdmin = value;
    this.authService.getAdminState(this.isAdmin);
  }

  signup() {
    this.authService.signup(this.email, this.password);
    this.email = this.password = '';
  }

  login() {
    this.authService.login(this.email, this.password);
    this.email = this.password = '';
  }

  logout() {
    this.authService.logout();
  }
}
