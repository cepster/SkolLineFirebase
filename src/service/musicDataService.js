// import Firebase from 'github:firebase/firebase-bower@3.0.0';
import _ from 'underscore';
import { DataService } from './dataService';
import { inject } from 'aurelia-framework';

let fb;
let dataService;

@inject(DataService)
export class MusicDataService {
  constructor(_dataService) {
    dataService = _dataService;
    fb = new Firebase(dataService.endpoint);
    this.musicCache = [];

    fb.on('child_added', (snapshot, id) => {
      let tune = snapshot.val();
      tune.id = snapshot.key();
      this.musicCache.push(tune);
    });

    fb.on('child_removed', (snapshot) => {
      this.musicCache = _.without(this.musicCache, _.findWhere(this.musicCache, {id: snapshot.key()}));
    });
  }

  getMusicById(id) {
    let cached = _.find(this.musicCache, (tune) => {
      return tune.id === id;
    });

    if (cached) {
      return new Promise((resolve) => {
        resolve(cached);
      });
    }

    return new Promise((resolve) => {
      fb.child(id).on('value', (snapshot) => {
        let tune = snapshot.val();
        tune.id = snapshot.key();
        resolve(tune);
      });
    });
  }

  saveMusic(music, callback) {
    if (music.id) {
      let tune = JSON.parse(JSON.stringify(music));
      delete tune.id;
      fb.child(music.id).update(dataService.sanitizeObjectForFirebaseSave(tune), callback);
    } else {
      fb.push(dataService.sanitizeObjectForFirebaseSave(music), callback);
    }
  }

  deleteMusic(music, callback) {
    fb.child(music.id).remove(callback);
  }

}
