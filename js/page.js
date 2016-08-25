'use strict';

let PhoneCatalogue = require('./phoneCatalogue');
let PhoneViewer = require('./phoneViewer');
let Filter = require('./filter');
let Sorter = require('./sorter');

class Page {
  constructor(options) {
    this._el = options.element;

    this._catalogue = new PhoneCatalogue({
      element: this._el.querySelector('[data-component="phoneCatalogue"]')
    });

    this._loadPhones();

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
    this._filter.getElement().addEventListener('filterChanged', this._onFilterChanged.bind(this));
  }

  _onPhoneSelected(event) {
    let phoneId = event.detail;
    let phoneDetails = this._getPhoneById(phoneId);

    this._catalogue.hide();

    this._viewer.render(phoneDetails);
    this._viewer.show();
  }

  _onFilterChanged(event) {
    let query = event.detail;

    this._loadPhones(query)
  }

  _loadPhones(query) {
    let xhr = new XMLHttpRequest();
    let url = '/data/phones.json';

    if (query) {
      url += '?query=' + query;
    }

    xhr.open('GET', url, true);

    xhr.send();

    xhr.onload = function() {
      if (xhr.status != 200) {
        alert( xhr.status + ': ' + xhr.statusText ); // пример вывода: 404: Not Found
      } else {
        let phones = JSON.parse(xhr.responseText);

        // ToDo: move this code to the server
        if (query) {
          let pattern = query.toLowerCase();

          phones = phones.filter(function(phone) {
            return !query || phone.name.toLowerCase().indexOf(pattern) !== -1;
          });
        }

        this._catalogue.render(phones);
      }
    }.bind(this);
  }

  _getPhoneById(phoneId) {
    return defaultPhones.filter(function(phone) {
      return phone.id === phoneId;
    })[0];
  }
}

module.exports = Page;