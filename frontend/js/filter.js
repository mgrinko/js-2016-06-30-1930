'use strict';

const BaseComponent = require('./baseComponent');

class Filter extends BaseComponent {
  constructor(options) {
    super(options.element);

    this._field = this._el.querySelector('[data-element="field"]');

    this.on('input', this._onFieldChange.bind(this), '[data-element="field"]')
  }

  getValue() {
    return this._field.value;
  }

  _onFieldChange() {
    this.trigger('filterChanged', this.getValue());
  }
}

module.exports = Filter;