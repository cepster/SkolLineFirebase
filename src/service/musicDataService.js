import {inject} from 'aurelia-framework';
import {HttpClient} from 'aurelia-http-client';
// import {Firebase} from 'firebase';

// let http;

@inject(HttpClient)
export class MusicDataService {
  constructor(_http) {
    // http = _http;
    // fb = new Firebase("https://skolline.firebaseio.com/").child('music');
  }

  getAllMusic() {
    // return http.get("/api/music");
    return new Promise(function(resolve, reject) {
      resolve({'content': [
        {
          _id: 1,
          name: 'Smack',
          href: 'detail/1'
        },
        {
          _id: 2,
          name: 'Skol B',
          href: 'detail/2'
        }
      ]});
    });
  }

  getMusicById(id) {
    // return http.get('/api/music/' + id);
  }

}
