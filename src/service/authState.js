import {inject} from 'aurelia-framework';
import {HttpClient} from 'aurelia-http-client';

@inject(HttpClient)
export class AuthState {
  constructor(http) {
    this.http = http;
    this.user = {};
  }

  initialize() {
    // this.http.get('/api/me')
    //          .then(response => {
    //            this.user = response.content;
    //          });

    this.user = {
      _id: Math.random(),
      name: 'Matt Richards',
      admin: true
    };
  }

  setUser(u) {
    this.user = u;
  }

  getUserID() {
    return this.user._id;
  }

  getUserName() {
    return this.user.name;
  }

  isAdmin() {
    // return this.user.admin; FIX THIS
    return true;
  }

  getProfileImageURL() {
    if (this.user) {
      return this.user.profileImageURL;
    }

    return '';
  }
}
