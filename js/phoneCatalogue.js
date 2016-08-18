'use strict';

let template = document.getElementById('phone-catalogue-template').innerHTML;

class PhoneCatalogue {
  constructor(options) {
    console.log(template);

    this._compiledTemplate = _.template(template);

    console.log(this._compiledTemplate);

    this._el = options.element;

    this._render(options.phones);

    this._el.addEventListener('click', event => {
      if (!event.target.closest('[data-element="phoneLink"]')) {
        return;
      }

      //event.preventDefault();

      let phoneContainer = event.target.closest('[data-element="phone"]');

      let customEvent = new CustomEvent('phoneSelected', {
        detail: phoneContainer.dataset.phoneId
      });

      this._el.dispatchEvent(customEvent);
    });
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