import { inject } from 'aurelia-framework';
import { Router } from 'aurelia-router';
import * as toastr from 'toastr';
import { MusicDataService } from '../service/musicDataService';

let musicDataService;
let router;

@inject(MusicDataService, Router)
export class MusicDetail {
  constructor(_musicDataService, _router) {
    musicDataService = _musicDataService;
    router = _router;
  }

  activate(params) {
    if (params.musicID !== '0') {
      musicDataService.getMusicById(params.musicID).then((response) => {
        this.tune = response;
      });
    } else {
      this.tune = {};
    }
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
