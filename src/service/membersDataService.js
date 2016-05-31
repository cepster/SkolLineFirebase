import {inject} from 'aurelia-framework';
import { DataService } from './dataService';
import _ from 'underscore';

let fb;
let dataService;

const defaultPassword = 'skolvikings';

@inject(DataService)
export class MembersDataService {

  constructor(_dataService) {
    dataService = _dataService;
    fb = new Firebase(dataService.getEndPoint('members'));
    this.memberCache = [];

    fb.on('child_added', (snapshot) => {
      let member = snapshot.val();
      member.id = snapshot.key();
      this.memberCache.push(member);
    });

    fb.on('child_removed', (snapshot) => {
      this.memberCache = _.without(this.memberCache, _.findWhere(this.memberCache, {id: snapshot.key()}));
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

  getMemberByUid(id) {
    let cached = _.find(this.memberCache, (member) => {
      return member.uid === id;
    });

    if (cached) {
      return new Promise((resolve) => {
        resolve(cached);
      });
    }

    return new Promise((resolve) => {
      fb.on('value', (snapshot) => {
        _.each(snapshot.val(), (member) => {
          if (member.uid === id) {
            resolve(member);
          }
        });
      });
    });
  }

  saveMember(member, callback) {
    if (member.id) {
      let thisMember = JSON.parse(JSON.stringify(member));
      delete thisMember.id;
      fb.child(member.id).update(dataService.sanitizeObjectForFirebaseSave(thisMember), callback);
    } else {
      this.generateUser(member.email).then((userData) => {
        member.uid = userData.uid;
        fb.push(dataService.sanitizeObjectForFirebaseSave(member), callback);
      });
    }
  }

  deleteMember(member, callback) {
    fb.child(member.id).remove(callback);
  }

  generateUser(emailAddress) {
    return new Firebase(dataService.endpoint).createUser({
      email: emailAddress,
      password: defaultPassword
    });
  }
}
