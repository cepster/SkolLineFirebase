import {inject} from 'aurelia-framework';
import {Router} from 'aurelia-router';
import {MusicDataService} from '../service/musicDataService';

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
    // return musicDataService.getAllMusic();
            //  .then(response => {
            //    this.music = [response.response];
            //  });
  }

  loadDetail(id) {
    musicDataService.getMusicById(id)
      .then(response =>{
        this.selectedMusic = response;
      });
  }

  newMusic() {
    router.navigateToRoute('musicDetail/0');
  }
  
  getMusic() {
    return musicDataService.musicCache;
  }

  // configureRouter(config, childRouter) {
  //   config.map([
  //     { route: 'detail',  name: 'detail',  moduleId: 'musicDetail', title: 'Child Router' }
  //   ]);

  //   this.childRouter = childRouter;
  // }
}
