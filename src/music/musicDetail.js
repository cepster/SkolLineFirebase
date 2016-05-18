import { inject } from 'aurelia-framework';
import * as toastr from 'toastr';
import { MusicDataService } from '../service/musicDataService';

let musicDataService;

@inject(MusicDataService)
export class MusicDetail {
  constructor(_musicDataService) {
    musicDataService = _musicDataService;
  }

  activate(params) {
    if (params.musicID !== '0') {
      musicDataService.getMusicById(params.musicID).then((response) => {
        this.tune = response;
      });
    }
  }

  canSave() {
    return true;
  }

  save() {
    musicDataService.saveMusic(this.tune, ()=> {
      toastr.success('Saved', {timeout: 2000});
    });
  }
}
