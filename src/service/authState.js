import {inject} from 'aurelia-framework';
import {MembersDataService} from './membersDataService';
import {AuthenticationManager} from 'aurelia-firebase';

@inject(MembersDataService, AuthenticationManager)
export class AuthState {
  constructor(membersDataService, authManager) {
    membersDataService.getMemberByUid(authManager.currentUser.uid).then((data) => {
      authManager.currentUser.isAdmin = data.isAdmin;
    });
  }
}
