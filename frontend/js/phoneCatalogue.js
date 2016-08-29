'use strict';

const BaseComponent = require('./baseComponent');

let compiledTemplate = require('./../templates/phone-catalogue-template.hbs');

class PhoneCatalogue extends BaseComponent {
  constructor(options) {
    super(options.element);

    this.on('click', this._onPhoneLinkClick.bind(this), '[data-element="phoneLink"]');
  }


  render(phones) {
    this._el.innerHTML = compiledTemplate({
      phones: phones
    });
  }

  _onPhoneLinkClick(event) {
    let phoneContainer = event.target.closest('[data-element="phone"]');

    this.trigger('phoneSelected', phoneContainer.dataset.phoneId);
  }
}

module.exports = PhoneCatalogue;