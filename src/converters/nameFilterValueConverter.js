import _ from 'underscore';

export class FilterOnNameValueConverter {
  toView(array, filter) {
    return _.filter(array, (item) => {
      return !filter || item.name.toLowerCase().includes(filter.toLowerCase());
    });
  }
}
