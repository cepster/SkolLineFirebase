import {inject} from 'aurelia-framework';
import { DataService } from './dataService';

let fb;
let dataService;

@inject(DataService)
export class MembersDataService {

  constructor(_dataService) {
    dataService = _dataService;
    fb = new Firebase(dataService.endpoint);
    this.memberCache = [];

    fb.on('child_added', (snapshot) => {
      let member = snapshot.val();
      member.id = snapshot.key();
      this.memberCache.push(member);
    });

    fb.on('child_removed', (snapshot) => {
      this.memberCache.without(this.memberCache, _.findWhere(this.memberCache, {id: snapshot.key()}));
    });
  }

  getMemberById(id) {
    let cached = _.find(this.memberCache, (member) => {
      return member.id === id;
    });

    if (cached) {
      return new Promise((resolve) => {
        resolve(cached);
      });
    }

    return new Promise((resolve) => {
      fb.child(id).on('value', (snapshot) => {
        let member = snapshot.val();
        member.id = snapshot.key();
        resolve(member);
      });
    });
  }

  saveMember(member) {
    if (member._id) {
      let thisMember = JSON.parse(JSON.stringify(member));
      delete thisMember.id;
      fb.child(member.id).update(dataService.sanitizeObjectForFirebaseSave(thisMember), callback);
    } else {
      fb.push(dataService.sanitizeObjectForFirebaseSave(member), callback);
    }
  }

  deleteMemberById(member, callback) {
    fb.child(member.id).remove(callback);
  }
}
