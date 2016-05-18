import {customAttribute, bindable, inject} from 'aurelia-framework';
import $ from 'jquery';
// import * as jqueryui from 'jquery-ui';

@inject(Element)
@customAttribute('date-picker')
@bindable('value')
export class SkolDatePicker {
  constructor(element) {
    this.element = element;
  }

  bind() {
    $(this.element).datepicker({
      format: 'mm/dd/yyyy',
      onSelect: function(date, element) {
        $(this).change();
      }
    });
  }

  valueChanged(newValue) {
    $(this.element).datepicker('setDate', newValue);
  }
}
