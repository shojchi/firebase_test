import {Injectable} from '@angular/core';
import {Customer} from './customer';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {FormBuilder, Validators} from '@angular/forms';

const url = 'https://accounttest-dc6ea-default-rtdb.firebaseio.com/customers';
const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  customers: Customer[] = [];

  constructor(public http: HttpClient, private fb: FormBuilder) {
  }

  form = this.fb.group({
    key: [null],
    name: ['', Validators.required],
    email: ['', Validators.email],
    mobile: ['', [Validators.required, Validators.minLength(8)]],
    location: ['', Validators.required],
  });

  resetTemp(customer: Customer): void {
    customer = {
      key: null,
      name: null,
      email: null,
      mobile: null,
      location: null
    };
  }

  trimKey(customer: Customer): Customer {
    return Object.assign({}, {
      name: customer.name,
      email: customer.email,
      mobile: customer.mobile,
      location: customer.location
    });
  }

  // create = post
  insertCustomer(customer: Customer): void {
    this.http.post<Customer>(`${url}.json`, customer, httpOptions)
      .subscribe(
        res => {
          customer.key = res.name;
          this.customers.push(customer);
          console.log(this.customers);
        },
        err => console.log(err));
  }

  // read = get
  getCustomersList(): void {
    this.http.get<Customer[]>(`${url}.json`, httpOptions)
      .subscribe(
        res => {
          Object.keys(res).forEach(key => {
            const obj = Object.assign({}, res[key]);
            obj.key = key;
            this.customers.push(obj);
          });
        },
        err => console.log(err)
      );
  }

  // update = put
  updateCustomer(key: string, customer: Customer): void {
    this.http.put<Customer>(`${url}/${key}.json`, customer, httpOptions)
      .subscribe(
        res => console.log(res),
        err => console.log(err)
      );
  }

  // delete
  deleteCustomer(customer: Customer): void {
    this.http.delete<void>(`${url}/${customer.key}.json`, httpOptions)
      .subscribe(
        () => this.customers.splice(this.customers.indexOf(customer), 1),
        err => console.log(err)
      );
  }
}
