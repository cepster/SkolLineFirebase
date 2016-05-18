import {inject} from 'aurelia-framework';
import {Router} from 'aurelia-router';
import {MusicDataService} from '../service/musicDataService';

let musicDataService;
let router;

@inject(Router, MusicDataService)
export class Music {

  constructor(_router, _musicDataService) {
    this.music = [];
    this.selectedMusic = undefined;

    router = _router;
    musicDataService = _musicDataService;
  }

  activate(params) {
    return musicDataService.getAllMusic()
             .then(response => {
               this.music = response.content;
             });
  }

  loadDetail(id) {
    musicDataService.getMusicById(id)
      .then(response =>{
        this.selectedMusic = response.content;
      });
  }

  newMusic() {
    router.navigateToRoute('musicDetail', { musicID: 0 });
  }
}
