import { inject } from 'aurelia-framework';
import { Router } from 'aurelia-router';
import * as toastr from 'toastr';
import { MembersDataService } from '../service/membersDataService';
import {AuthenticationManager} from 'aurelia-firebase';

let membersDataService;
let router;
let authManager;

@inject(MembersDataService, Router, AuthenticationManager)
export class MemberDetail {
  constructor(_membersDataService, _router, _authManager) {
    membersDataService = _membersDataService;
    router = _router;
    authManager = _authManager;
  }

  activate(params) {
    if (params.memberID !== '0') {
      membersDataService.getMemberById(params.memberID).then((response) => {
        this.member = response;
      });
    } else {
      this.member = {};
    }

    this.isAdmin = authManager.currentUser.isAdmin;
    this.editMode = false;
  }

  save() {
    membersDataService.saveMember(this.member, () => {
      toastr.success('Saved', {timeout: 2000});
      this.editMode = false;
    });
  }

  delete() {
    membersDataService.deleteMember(this.member, () => {
      toastr.success('The member has been deleted');
      router.navigateToRoute('members');
    });
  }

  edit() {
    this.editMode = true;
  }
}
