import {inject} from 'aurelia-framework';
import {Router} from 'aurelia-router';
import {AuthState} from '../service/authState';
import {GigDataService} from '../service/gigDataService';
import _ from 'underscore';

let router;
let authState;
let gigDataService;

@inject(Router, AuthState, GigDataService)
export class Gigs {

  constructor(_router, _authState, _gigDataService) {
    router = _router;
    authState = _authState;
    gigDataService = _gigDataService;

    // this.gigs = [];
    this.noResponse = [];
    this.going = [];
    this.notGoing = [];
    this.chosenOption = 'inbox';
  }

  activate() {
    return this.loadGigs();
  }

  loadGigs() {
    return gigDataService.getAllGigs()
                    .then(response => {
                      this.setRSVPStatuses(response.content);
                    });
  }

  setRSVPStatuses(allGigs) {
    this.going = _.filter(allGigs, gig => {
      return _.find(gig.attendees, attendee => {
        return attendee.userID === authState.getUserID() && attendee.going;
      });
    });

    this.notGoing = _.filter(allGigs, gig => {
      return _.find(gig.attendees, attendee => {
        return attendee.userID === authState.getUserID() && !attendee.going;
      });
    });

    this.noResponse = _.filter(allGigs, gig => {
      return _.find(gig.attendees, attendee => {
        return attendee.userID === authState.getUserID();
      }) === undefined;
    });

    // this.gigs = [
    //   {
    //     title: 'No Response',
    //     list: noResponseList,
    //     needRsvp: true
    //   },
    //   {
    //     title: 'Going',
    //     list: goingList,
    //     needRsvp: false,
    //   },
    //   {
    //     title: 'Not Going',
    //     list: notGoingList,
    //     needRsvp: false
    //   }
    // ];
  }

  newGig() {
    router.navigateToRoute('gigDetail', { gigID: 0 });
  }

  rsvp(gigID, status) {
    return gigDataService.rsvpForGigById(gigID, status)
                    .then(response => {
                      $('div[foo=' + gigID + ']').transition('fade down');
                      this.loadGigs();
                    });
  }

  removeRsvp(gigID) {
    return gigDataService.removeRsvpById(gigID)
                    .then(response => {
                      this.loadGigs();
                    });
  }

  toggleSchedule(filter) {
    this.chosenOption = filter;
  }
}
