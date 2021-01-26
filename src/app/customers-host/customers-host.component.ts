import { Component, OnInit } from '@angular/core';
import {AuthService} from '../shared/auth.service';

@Component({
  selector: 'app-customers-host',
  templateUrl: './customers-host.component.html',
  styleUrls: ['./customers-host.component.scss']
})
export class CustomersHostComponent implements OnInit {

  adminStateHost: boolean;

  constructor(public authService: AuthService) { }

  ngOnInit(): void {
    this.adminStateHost = this.authService.postAdminState();
  }

}
