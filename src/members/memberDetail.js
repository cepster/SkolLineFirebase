import { inject } from 'aurelia-framework';
import { Router } from 'aurelia-router';
import * as toastr from 'toastr';
import { MembersDataService } from '../service/membersDataService';

let membersDataService;
let router;

@inject(MembersDataService, Router)
export class MemberDetail {
  constructor(_membersDataService, _router) {
    membersDataService = _membersDataService;
    router = _router;
  }

  activate(params) {
    if (params.memberID !== '0') {
      membersDataService.getMemberById(params.memberID).then((response) => {
        this.member = response;
      });
    } else {
      this.member = {};
    }
  }

  save() {
    membersDataService.saveMember(this.member, () => {
      toastr.success('Saved', {timeout: 2000});
      router.navigateToRoute('members');
    });
  }

  delete() {
    membersDataService.deleteMember(this.member, () => {
      toastr.success('The member has been deleted');
      router.navigateToRoute('members');
    });
  }
}
