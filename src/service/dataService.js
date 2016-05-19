export class DataService {
  constructor() {
    this.endpoint = 'https://skolline.firebaseio.com/music';
  }

  sanitizeObjectForFirebaseSave(inObj) {
    for (let i in inObj) {
      if (typeof inObj[i] === 'undefined') {
        delete inObj[i];
      }
    }
    return inObj;
  }
}
