'use strict';

let PhoneCatalogue = require('./phoneCatalogue');
let PhoneViewer = require('./phoneViewer');
let Filter = require('./filter');
let Sorter = require('./sorter');

class Page {
  constructor(options) {
    this._el = options.element;

    this._catalogue = new PhoneCatalogue({
      element: this._el.querySelector('[data-component="phoneCatalogue"]'),
      phones: this._getPhones()
    });

    this._viewer = new PhoneViewer({
      element: this._el.querySelector('[data-component="phoneViewer"]')
    });

    this._viewer.hide();

    this._filter = new Filter({
      element: this._el.querySelector('[data-component="filter"]')
    });

    this._sorter = new Sorter({
      element: this._el.querySelector('[data-component="sorter"]')
    });

    this._catalogue.getElement().addEventListener('phoneSelected', this._onPhoneSelected.bind(this));
  }

  _onPhoneSelected(event) {
    let phoneId = event.detail;
    let phoneDetails = this._getPhoneById(phoneId);

    this._catalogue.hide();

    this._viewer.render(phoneDetails);
    this._viewer.show();
  }

  _getPhones() {
    var xhr = new XMLHttpRequest();

    xhr.open('GET', '/data/phones.json', false);

    xhr.send();

    if (xhr.status != 200) {
      alert( xhr.status + ': ' + xhr.statusText ); // пример вывода: 404: Not Found
    } else {
      return JSON.parse(xhr.responseText);
    }
  }

  _getPhoneById(phoneId) {
    return defaultPhones.filter(function(phone) {
      return phone.id === phoneId;
    })[0];
  }
}

module.exports = Page;