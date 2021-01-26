import {Injectable} from '@angular/core';
import {AngularFireAuth} from '@angular/fire/auth';
import {Observable} from 'rxjs';
import firebase from 'firebase';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  user: Observable<firebase.User>;
  adminState = false;
  postState: boolean;

  constructor(private firebaseAuth: AngularFireAuth) {
    this.user = firebaseAuth.authState;
  }

  getAdminState(isAdmin: boolean) {
    this.adminState = isAdmin;
  }

  postAdminState() {
     this.postState = this.adminState;
     return this.postState;
  }

  signup(email: string, password: string) {
    this.firebaseAuth
      .createUserWithEmailAndPassword(email, password)
      .then(value => {
        console.log(this.adminState);
      })
      .catch(err => {
        console.log('Something went wrong:', err.message);
      });
  }

  login(email: string, password: string) {
    this.firebaseAuth
      .signInWithEmailAndPassword(email, password)
      .then(value => {
        console.log(this.adminState);
      })
      .catch(err => {
        console.log('Something went wrong:', err.message);
      });
  }

  logout() {
    this.firebaseAuth.signOut();
  }
}
