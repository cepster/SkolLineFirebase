import { inject } from 'aurelia-framework';
import { Router } from 'aurelia-router';
import * as toastr from 'toastr';
import { MusicDataService } from '../service/musicDataService';
import {AuthenticationManager} from 'aurelia-firebase';
import {AuthState} from '../service/authState';

let musicDataService;
let router;
let authManager;

@inject(MusicDataService, Router, AuthenticationManager, AuthState)
export class MusicDetail {
  constructor(_musicDataService, _router, _authManager) {
    musicDataService = _musicDataService;
    router = _router;
    authManager = _authManager;

    this.editMode = false;
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
      this.editMode = false;
    });
  }

  delete() {
    musicDataService.deleteMusic(this.tune, () => {
      toastr.success('The music has been deleted');
      router.navigateToRoute('music');
    });
  }

  edit() {
    this.editMode = true;
  }
}
