import {inject} from 'aurelia-framework';
import {MembersDataService} from '../service/membersDataService';

let membersDataService;

@inject(MembersDataService)
export class Members {

  heading = 'Our Members';

  constructor(_membersDataService) {
    this.members = [];

    membersDataService = _membersDataService;
  }

  getMembers() {
    return membersDataService.memberCache;
  }

  configureRouter(config, childRouter) {
    config.map([
      {route: '',                name: 'memberDetailEmpty',       moduleId: 'members/memberDetailEmpty',    title: 'Choose a member',   nav: true},
      {route: 'detail/:memberID', name: 'detail', moduleId: 'members/memberDetail'}
    ]);

    this.childRouter = childRouter;
  }
}
