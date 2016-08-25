'use strict';

class Filter {
  constructor(options) {
    this._el = options.element;

    this._field = this._el.querySelector('[data-element="field"]');

    this._field.addEventListener('input', this._onFieldChange.bind(this))
  }


  getElement() {
    return this._el;
  }

  _onFieldChange() {
    let customEvent = new CustomEvent('filterChanged', {
      detail: this._field.value
    });

    this._el.dispatchEvent(customEvent);
  }


}

module.exports = Filter;