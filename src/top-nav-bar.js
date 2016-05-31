import {bindable} from 'aurelia-framework';
import {inject} from 'aurelia-framework';
import {Router} from 'aurelia-router';
import * as toastr from 'toastr';
import {AuthenticationManager} from 'aurelia-firebase';
import {MembersDataService} from './service/MembersDataService';

let router;
let authManager;
let membersDataService;

@inject(AuthenticationManager, Router, MembersDataService)
export class TopNavBar {

  @bindable router = null;

  constructor(_authManager, _router, _membersDataService) {
    authManager = _authManager;
    router = _router;
    membersDataService = _membersDataService;

    this.setUserValues();
  }

  setUserValues() {
    this.authenticated = authManager.currentUser.isAuthenticated;
    this.userImage = authManager.currentUser.profileImageUrl;

    if (authManager.currentUser) {
      membersDataService.getMemberByUid(authManager.currentUser.uid).then((data) => {
        authManager.currentUser.isAdmin = data.isAdmin;
        authManager.currentUser.name = data.name;
        this.currentLoggedInUser = data.name;
      });
    }
  }

  login() {
    this.message = null;
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
