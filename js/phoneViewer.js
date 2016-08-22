'use strict';

class PhoneViewer {
  constructor(options) {
    let template = document.getElementById('phone-viewer-template').innerHTML;
    this._compiledTemplate = _.template(template);

    this._el = options.element;

  }

  show() {
    this._el.classList.remove('js-hidden');
  }

  hide() {
    this._el.classList.add('js-hidden');
  }

  render(phone) {
    this._el.innerHTML = this._compiledTemplate({
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