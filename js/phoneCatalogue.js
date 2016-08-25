'use strict';

const BaseComponent = require('./baseComponent');

let template = require('raw!./../templates/phone-catalogue-template.html');

class PhoneCatalogue extends BaseComponent {
  constructor(options) {
    super(options.element);

    this._compiledTemplate = _.template(template);

    this.on('click', this._onPhoneLinkClick.bind(this), '[data-element="phoneLink"]');
  }


  render(phones) {
    this._el.innerHTML = this._compiledTemplate({
      phones: phones
    });
  }

  _onPhoneLinkClick(event) {
    let phoneContainer = event.target.closest('[data-element="phone"]');

    this.trigger('phoneSelected', phoneContainer.dataset.phoneId);
  }
}

module.exports = PhoneCatalogue;