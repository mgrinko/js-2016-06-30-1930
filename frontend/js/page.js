'use strict';

let ajaxService = require('./ajaxService');

let PhoneCatalogue = require('./phoneCatalogue');
let PhoneViewer = require('./phoneViewer');
let Filter = require('./filter');
let Sorter = require('./sorter');
let Confirmation = require('./confirmation');

class Page {
  constructor(options) {
    this._el = options.element;


    this._catalogue = new PhoneCatalogue({
      element: this._el.querySelector('[data-component="phoneCatalogue"]')
    });

    this._viewer = new PhoneViewer({
      element: this._el.querySelector('[data-component="phoneViewer"]')
    });

    this._filter = new Filter({
      element: this._el.querySelector('[data-component="filter"]')
    });

    this._sorter = new Sorter({
      element: this._el.querySelector('[data-component="sorter"]')
    });

    this._confirmation = new Confirmation({
      element: this._el.querySelector('[data-component="confirmation"]')
    });


    this._catalogue.on('phoneSelected', this._onPhoneSelected.bind(this));
    this._filter.on('filterChanged', this._onFilterChanged.bind(this));
    this._viewer.on('back', this._onBackFromViewer.bind(this));


    this._loadPhones();
  }

  _onBackFromViewer() {
    let query = this._filter.getValue();

    this._loadPhones(query);
  }

  _onPhoneSelected(event) {
    let phoneId = event.detail;

    this._confirmation.show();

    let loadPromise = this._loadPhoneById(phoneId);
    let confirmationPromise = this._createConfirmationPromise();

    // show loader

    confirmationPromise
      .then(function() {
        return loadPromise;
      })
      .then(this._showPhone.bind(this))
      .catch(this._handleError.bind(this))
      // .filnally(function() {
      //   // hide loader
      // });

    Promise.all([loadPromise, confirmationPromise])
      .then(function(results) {
        this._showPhone(results[0])
      })
      .catch(this._handleError.bind(this));
  }

  _createConfirmationPromise() {
    return new Promise(function(resolve, reject) {
      this._confirmation.on('submit', function() {
        resolve();
      }.bind(this));

      this._confirmation.on('reset', function() {
        reject();
      }.bind(this));
    }.bind(this));
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

    return ajaxService.ajax(url, {
      method: 'GET'
    })
      .then(function(phones) {
        // ToDo: move this code to the server
        if (query) {
          let pattern = query.toLowerCase();

          phones = phones.filter(function(phone) {
            return phone.name.toLowerCase().indexOf(pattern) !== -1;
          });
        }

        this._catalogue.render(phones);
        this._catalogue.show();

        this._viewer.hide();
      }.bind(this))

      .catch(function(error) {
        console.error(error);
      }.bind(this))
  }

  _loadPhoneById(phoneId) {
    return ajaxService.ajax(`/data/${phoneId}.json`, {
      method: 'GET'
    });
  }

  _showPhone(phone) {
    this._viewer.render(phone);
    this._viewer.show();

    this._catalogue.hide();
  }

  _handleError(error) {
    console.error(error);
  }
}

module.exports = Page;