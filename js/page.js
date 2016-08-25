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

    this._loadPhoneById(phoneId);

    this._catalogue.hide();
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

    xhr.onerror = function() {
      console.error( xhr.status + ': ' + xhr.statusText );
    };

    xhr.onload = function() {
      if (xhr.status != 200) {
        console.error( xhr.status + ': ' + xhr.statusText );
      } else {
        let phones = JSON.parse(xhr.responseText);

        // ToDo: move this code to the server
        if (query) {
          let pattern = query.toLowerCase();

          phones = phones.filter(function(phone) {
            return phone.name.toLowerCase().indexOf(pattern) !== -1;
          });
        }

        this._catalogue.render(phones);
      }
    }.bind(this);

    xhr.open('GET', url, true);

    xhr.send();
  }

  _loadPhoneById(phoneId) {
    this.ajax(`/data/${phoneId}.json`, {
      method: 'GET',

      success: function(phone) {
        this._viewer.render(phone);
        this._viewer.show();
      }.bind(this),

      error: function(error) {
        console.error(error);
      }.bind(this)
    })
  }

  ajax(url, options) {
    let xhr = new XMLHttpRequest();

    xhr.open(options.method || 'GET', url, true);

    xhr.onload = function() {
      if (xhr.status != 200) {
        options.error( xhr.status + ': ' + xhr.statusText );
      } else {
        let response = JSON.parse(xhr.responseText);

        options.success(response);
      }
    };

    xhr.onerror = function() {
      options.error(xhr.status + ': ' + xhr.statusText);
    };

    xhr.send();
  }
}

module.exports = Page;