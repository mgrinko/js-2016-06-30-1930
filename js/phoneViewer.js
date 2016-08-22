'use strict';

let compiledTemplate = require('./../templates/phone-viewer-template.hbs');

class PhoneViewer {
  constructor(options) {
    this._el = options.element;
  }

  show() {
    this._el.classList.remove('js-hidden');
  }

  hide() {
    this._el.classList.add('js-hidden');
  }

  render(phone) {
    this._el.innerHTML = compiledTemplate({
      phone: phone
    });
  }

  // this._el.addEventListener('click', this._onBackButtonClick.bind(this));
  //
  // _onBackButtonClick(event) {
  //   if (!event.target.closest('[data-element="backButton"]')) {
  //     return;
  //   }
  //
  //   this._triggerBackEvent();
  // }
  //
  // _triggerBackEvent() {
  //   this._el.dispatchEvent(new CustomEvent('back'));
  // }
}

module.exports = PhoneViewer;