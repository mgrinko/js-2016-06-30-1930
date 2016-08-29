'use strict';

const BaseComponent = require('./baseComponent');

let template = require('raw!./../templates/confirmation.html');

class Confirmation extends BaseComponent {
  constructor(options) {
    super(options.element);

    this.on('click', this._onSubmitClick.bind(this), '[data-element="submit"]');
    this.on('click', this._onResetClick.bind(this), '[data-element="reset"]');
  }

  render() {
    this._el.innerHTML = template;
  }

  _onSubmitClick() {
    this.trigger('submit');
  }

  _onResetClick() {
    this.trigger('reset');
  }
}

module.exports = Confirmation;