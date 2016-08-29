'use strict';

const BaseComponent = require('./baseComponent');

class Filter extends BaseComponent {
  constructor(options) {
    super(options.element);

    this._field = this._el.querySelector('[data-element="field"]');

    this.on('input', this._onFieldChange.bind(this), '[data-element="field"]')
  }

  _onFieldChange() {
    this.trigger('filterChanged', this._field.value);
  }
}

module.exports = Filter;