import {inject} from 'aurelia-framework';
import {HttpClient} from 'aurelia-http-client';
import {AuthState} from './authState';

let http;
let authState;

const getRsvpUrl = function(gigID, userID) {
  return 'api/gig/' + gigID + '/attendee/' + userID;
};

const getFakeDataPromise = function(data) {
  return new Promise(function(resolve, reject) {
    resolve(data);
  });
};

@inject(HttpClient, AuthState)
export class GigDataService {
  constructor(_http, _authState) {
    http = _http;
    authState = _authState;
  }

  getAllGigs() {
    // return http.get('/api/gig');
    return getFakeDataPromise([]);
  }

  getGigById(id) {
    return http.get(`/api/gig/${id}`);
  }

  saveGig(gig) {
    if (gig._id) {
      return http.put(`/api/gig/${gig._id}`, gig);
    }

    return http.post('/api/gig', this.gig);
  }

  deleteGigById(id) {
    return http.delete(`/api/gig/${id}`);
  }

  rsvpForGigById(gigId, status) {
    let payload = {going: status};

    return this.http.post(getRsvpUrl(gigID, authState.getUserID()), payload);
  }

  removeRsvpById(gigId) {
    return this.http.delete(getRsvpUrl(gigID, authState.getUserID()));
  }

}
