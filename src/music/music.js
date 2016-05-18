import {inject} from 'aurelia-framework';
import {Router} from 'aurelia-router';
import {MusicDataService} from '../service/musicDataService';
import _ from 'underscore';

let musicDataService;
let router;

@inject(Router, MusicDataService)
export class Music {

  heading = 'Our Music';

  constructor(_router, _musicDataService) {
    this.music = [];
    this.selectedMusic = undefined;

    router = _router;
    musicDataService = _musicDataService;
  }

  activate(params) {

  }

  newMusic() {
    router.navigateToRoute('musicDetail/0');
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

export class FilterOnNameValueConverter {
  toView(array, filter) {
    return _.filter(array, (item) => {
      return !filter || item.name.toLowerCase().includes(filter.toLowerCase());
    });
  }
}
