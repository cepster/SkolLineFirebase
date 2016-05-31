import {inject} from 'aurelia-framework';
import {MusicDataService} from '../service/musicDataService';
import {AuthenticationManager} from 'aurelia-firebase';

let musicDataService;
let authManager;

@inject(MusicDataService, AuthenticationManager)
export class Music {

  heading = 'Our Music';

  constructor(_musicDataService, _authManager) {
    this.music = [];

    musicDataService = _musicDataService;
    authManager = _authManager;
  }

  activate() {
    this.isAdmin = authManager.currentUser.isAdmin;
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
