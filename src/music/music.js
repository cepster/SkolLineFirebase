import {inject} from 'aurelia-framework';
import {MusicDataService} from '../service/musicDataService';

let musicDataService;

@inject(MusicDataService)
export class Music {

  heading = 'Our Music';

  constructor(_musicDataService) {
    this.music = [];

    musicDataService = _musicDataService;
  }

  getMusic() {
    return musicDataService.musicCache;
  }

  configureRouter(config, childRouter) {
    config.map([
      {route: '',                name: 'musicDetailEmpty',       moduleId: 'music/musicDetailEmpty',    title: 'Choose a piece of music',   nav: true},
      {route: 'detail/:musicID', name: 'detail', moduleId: 'music/musicDetail'}
    ]);

    this.childRouter = childRouter;
  }
}
