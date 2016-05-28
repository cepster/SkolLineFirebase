import {bindable} from 'aurelia-framework';
import {inject} from 'aurelia-framework';
import {Router} from 'aurelia-router';
import * as toastr from 'toastr';


//Firebase Plugin
import {AuthenticationManager} from 'aurelia-firebase';

let router;

//Firebase auth manager
let authManager;

@inject(AuthenticationManager, Router)
export class TopNavBar {

  @bindable router = null;

  constructor(_authManager, _router) {
    authManager = _authManager;
    router = _router;

    this.setUserValues();
  }

  setUserValues() {
    this.authenticated = authManager.currentUser.isAuthenticated;
    this.userImage = authManager.currentUser.profileImageUrl;
  }

  login() {
    this.message = null;
    console.log(authManager);
    authManager.signIn(this.email, this.password)
      .then(() => {
        this.setUserValues();
        router.navigateToRoute('music');
      })
      .catch((e) => {
        toastr.success(e.message, {timeout: 2000});
      });
  }

  logout() {
    authManager.signOut().then(() => {
      this.authenticated = false;
      router.navigateToRoute('welcome');
      toastr.success('You have successfully been logged out');
    });
  }
}
