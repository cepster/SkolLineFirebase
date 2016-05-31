import {inject} from 'aurelia-framework';
import {MembersDataService} from './membersDataService';
import {AuthenticationManager} from 'aurelia-firebase';

@inject(MembersDataService, AuthenticationManager)
export class AuthState {
  constructor(membersDataService, authManager) {
    membersDataService.getMemberByUid(authManager.currentUser.uid).then((data) => {
      console.log('Found Member.  IsAdmin? ' + data.isAdmin);
      authManager.currentUser.isAdmin = data.isAdmin;
      authManager.currentUser.name = data.name;
    });
  }
}
