import { inject } from 'aurelia-framework';
import { Router } from 'aurelia-router';
import * as toastr from 'toastr';
import { MusicDataService } from '../service/musicDataService';
import {AuthenticationManager} from 'aurelia-firebase';

let musicDataService;
let router;
let authManager;

@inject(MusicDataService, Router, AuthenticationManager)
export class MusicDetail {
  constructor(_musicDataService, _router, _authManager) {
    musicDataService = _musicDataService;
    router = _router;
    authManager = _authManager;
  }

  activate(params) {
    if (params.musicID !== '0') {
      musicDataService.getMusicById(params.musicID).then((response) => {
        this.tune = response;
      });
    } else {
      this.tune = {};
    }

    this.isAdmin = authManager.currentUser.isAdmin;
  }

  save() {
    musicDataService.saveMusic(this.tune, ()=> {
      toastr.success('Saved', {timeout: 2000});
      router.navigateToRoute('music');
    });
  }

  delete() {
    musicDataService.deleteMusic(this.tune, () => {
      toastr.success('The music has been deleted');
      router.navigateToRoute('music');
    });
  }
}
