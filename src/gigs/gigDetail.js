import {inject} from 'aurelia-framework';
import {Router} from 'aurelia-router/';
import {GigDataService} from '../service/gigDataService';

let router;
let gigDataService;

@inject(HttpClient, Router, GigDataService)
export class GigDetail {

  constructor(_router, _gigDataService) {
    router = _router;
    gigDataService = _gigDataService;
    this.gig = undefined;
  }

  activate(params) {
    if (params.gigID !== '0') {
      return gigDataService.getGigById(params.gigID)
                      .then(response => {
                        this.gig = response.content;
                      });
    }

    return undefined;//TODO: Should this be undefined?
  }

  saveGig() {
    gigDataService.saveGig(this.gig)
      .then(response => {
        this.backToGigs();
      });
  }

  deleteGig() {
    if (this.gig._id) {
      gigDataService.deleteGigById(this.gig._id)
        .then(response => {
          this.backToGigs();
        });
    }
  }

  backToGigs() {
    router.navigateToRoute('gigs');
  }
}
