'use strict';

const BaseComponent = require('./baseComponent');

let compiledTemplate = require('./../templates/phone-viewer-template.hbs');

class PhoneViewer extends BaseComponent {
  constructor(options) {
    super(options.element);

    this.on('click', this._onBackButtonClick.bind(this), '[data-element="backButton"]');
  }

  render(phone) {
    this._el.innerHTML = compiledTemplate({
      phone: phone
    });
  }

  _onBackButtonClick(event) {
    this.trigger('back');
  }
}

module.exports = PhoneViewer;