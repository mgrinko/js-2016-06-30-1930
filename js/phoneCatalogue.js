'use strict';

let template = require('raw!./../templates/phone-catalogue-template.html');

class PhoneCatalogue {
  constructor(options) {
    this._el = options.element;

    this._compiledTemplate = _.template(template);

    this._render(options.phones);

    this._el.addEventListener('click', this._onPhoneLinkClick.bind(this));
  }

  getElement() {
    return this._el;
  }

  show() {
    this._el.classList.remove('js-hidden')
  }

  hide() {
    this._el.classList.add('js-hidden')
  }

  _onPhoneLinkClick(event) {
    if (!event.target.closest('[data-element="phoneLink"]')) {
      return;
    }

    let phoneContainer = event.target.closest('[data-element="phone"]');

    this._triggerPhoneSelectedEvent(phoneContainer.dataset.phoneId);
  }

  _render(phones) {
    this._el.innerHTML = this._compiledTemplate({
      phones: phones
    });
  }

  _triggerPhoneSelectedEvent(phoneId) {
    let customEvent = new CustomEvent('phoneSelected', {
      detail: phoneId
    });

    this._el.dispatchEvent(customEvent);
  }
}

module.exports = PhoneCatalogue;