import {inject} from 'aurelia-framework';
import {HttpClient} from 'aurelia-http-client';

let http;

let getFakeDataPromise = function(data) {
  return new Promise(function(resolve, reject) {
    resolve(data);
  });
};

@inject(HttpClient)
export class MembersDataService {

  constructor(_http) {
    http = _http;
  }

  getAllMembers() {
    // return http.get("/api/member");
    return getFakeDataPromise([]);
  }

  getMemberById(id) {
    // return http.get('/api/member/' + id);
    return getFakeDataPromise({});
  }

  saveMember(member) {
    if(member._id) {
      return http.put('/api/member/' + member._id, member);
    }

    return http.post('/api/member', member);
  }

  deleteMemberById(id) {
    http.delete('/api/member/' + id);
  }
}
