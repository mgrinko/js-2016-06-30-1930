'use strict';

let ajaxService = require('./ajaxService');

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
    let url = '/data/phones.json';

    if (query) {
      url += '?query=' + query;
    }

    ajaxService.ajax(url, {
      method: 'GET',

      success: function(phones) {
        // ToDo: move this code to the server
        if (query) {
          let pattern = query.toLowerCase();

          phones = phones.filter(function(phone) {
            return phone.name.toLowerCase().indexOf(pattern) !== -1;
          });
        }

        this._catalogue.render(phones);
      }.bind(this),

      error: function(error) {
        console.error(error);
      }.bind(this)
    });
  }

  _loadPhoneById(phoneId) {
    ajaxService.ajax(`/data/${phoneId}.json`, {
      method: 'GET',

      success: function(phone) {
        this._viewer.render(phone);
        this._viewer.show();
      }.bind(this),

      error: function(error) {
        console.error(error);
      }.bind(this)
    });
  }


}

module.exports = Page;