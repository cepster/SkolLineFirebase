import * as toastr from 'toastr';

export class MusicDetail {
  constructor() {
  }

  activate(params) {
    if (params.musicID !== '0') {
      this.tune = {
        _id: params.musicID,
        name: 'test'
      };
    }
  }

  canSave() {
    return true;
  }

  save() {
    toastr.success('Saved', {timeout: 2000});
  }
}
