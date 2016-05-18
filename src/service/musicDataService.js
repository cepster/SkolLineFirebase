// import Firebase from 'github:firebase/firebase-bower@3.0.0';
import _ from 'underscore';

let fb;
const fbUrl = 'https://skolline.firebaseio.com/music';

export class MusicDataService {
  constructor() {
    fb = new Firebase(fbUrl);
    this.musicCache = [];

    fb.on('child_added', (snapshot, id) => {
      let tune = snapshot.val();
      tune.id = snapshot.key();
      this.musicCache.push(tune);
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
      fb.child(music.id).update(tune, callback);
    } else {
      fb.push(music, callback);
    }
  }

}
