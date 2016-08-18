'use strict';

let template = document.getElementById('phone-catalogue-template').innerHTML;

class PhoneCatalogue {
  constructor(options) {
    this._el = options.element;

    this._compiledTemplate = _.template(template);

    this._render(options.phones);

    this._el.addEventListener('click', this._onPhoneLinkClick.bind(this));
  }

  _onPhoneLinkClick(event) {
    if (!event.target.closest('[data-element="phoneLink"]')) {
      return;
    }

    //event.preventDefault();

    let phoneContainer = event.target.closest('[data-element="phone"]');

    this._triggerPhoneSelectedEvent(phoneContainer.dataset.phoneId);
  }

  _triggerPhoneSelectedEvent(phoneId) {
    let customEvent = new CustomEvent('phoneSelected', {
      detail: phoneId
    });

    this._el.dispatchEvent(customEvent);
  }

  getElement() {
    return this._el;
  }

  _render(phones) {
    this._el.innerHTML = this._compiledTemplate({
      phones: phones
    });
  }
}