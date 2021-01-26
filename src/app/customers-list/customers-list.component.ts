import {Component, OnInit} from '@angular/core';
import {CustomerService} from '../shared/customer.service';
import {Customer} from '../shared/customer';
import {AuthService} from '../shared/auth.service';

@Component({
  selector: 'app-customers-list',
  templateUrl: './customers-list.component.html',
  styleUrls: ['./customers-list.component.scss']
})
export class CustomersListComponent implements OnInit {

  private editCustomer: Customer = {
    key: null,
    name: null,
    email: null,
    mobile: null,
    location: null
  };

  isEditPos: null | number;
  adminStateList: boolean;

  constructor(public svc: CustomerService, public authService: AuthService) {
  }

  ngOnInit(): void {
    this.svc.getCustomersList();
    this.adminStateList = this.authService.postAdminState();
  }

  editMode(i: number): void {
    this.svc.resetTemp(this.editCustomer);
    this.isEditPos = i;
  }

  cancelEdit(): void {
    this.isEditPos = null;
    this.svc.resetTemp(this.editCustomer);
  }

  setValue(key, value): void {
    if (this.editCustomer[key] !== undefined) {
      this.editCustomer[key] = value;
    }
  }

  save(customer: Customer): void {
    Object.keys(this.editCustomer).forEach(key => {
      if (this.editCustomer[key]) {
        customer[key] = this.editCustomer[key];
      }
    });

    this.svc.updateCustomer(customer.key, this.svc.trimKey(customer));
    this.isEditPos = null;
    this.svc.resetTemp(this.editCustomer);
  }

  deleteCustomer(customer: Customer): void {
    this.svc.deleteCustomer(customer);
  }
}

