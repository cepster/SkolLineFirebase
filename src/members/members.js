import {inject} from 'aurelia-framework';
import {Router} from 'aurelia-router';
import {MembersDataService} from '../service/membersDataService';

let router;
let membersDataService;

@inject(Router, MembersDataService)
export class Members {

  constructor(_router, _membersDataService) {
    router = _router;
    membersDataService = _membersDataService;

    this.members = [];
    this.selectedMember = undefined;
  }

  activate() {
    return membersDataService.getAllMembers()
                     .then(response => {
                       this.members = response.content;
                     });
  }

  fillMember(member) {
    this.selectedMember = member;
    if (!this.selectedMember.email) {
      this.selectedMember.email = '';
    }
    if (!this.selectedMember.name) {
      this.selectedMember.name = '';
    }
    if (!this.selectedMember.instrument) {
      this.selectedMember.instrument = '';
    }
    if (!this.selectedMember.phoneNumber) {
      this.selectedMember.phoneNumber = '';
    }
  }

  loadDetail(id) {
    membersDataService.getMemberById(id)
      .then(response =>{
        this.fillMember(response.content);
      });
  }

  saveMember() {
    membersDataService.saveMember(this.selectedMember)
      .then(response => {
        if (this.selectedMember._id) {
          alert('Saved!');
        } else {
          alert('Created!');
        }
      });
  }

  deleteMember() {
    membersDataService.deleteMemberById(this.selectedMember._id)
        .then(response => {
          router.navigateToRoute('members');
        });
  }
}
