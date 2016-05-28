import {bindable} from 'aurelia-framework';
import {inject} from 'aurelia-framework';
import {DataService} from './service/dataService';
import {AuthState} from './service/authState';

let dataService;
let authState;
let ref;

@inject(DataService, AuthState)
export class TopNavBar {

  @bindable router = null;

  constructor(_dataService, _authState) {
    dataService = _dataService;
    authState = _authState;

    this.authenticated = false;
  }

  login() {
    ref = new Firebase(dataService.endpoint);
    ref.authWithPassword({
      email: this.email,
      password: this.password
    }, (error, authData) => {
      if (error) {
        console.log('Login Failed!', error);
      } else {
        console.log('Authenticated successfully with payload:', authData);
        authState.setUser(authData.password);
        this.userImage = authState.getProfileImageURL();
        this.authenticated = true;
      }
    });
  }

  logout() {
    ref.unauth();
    this.authenticated = false;
  }
}
