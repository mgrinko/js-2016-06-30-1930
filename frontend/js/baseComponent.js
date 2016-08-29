'use strict';

class BaseComponent {
  constructor(element) {
    this._el = element;
  }

  show() {
    this._el.classList.remove('js-hidden')
  }

  hide() {
    this._el.classList.add('js-hidden')
  }

  on(eventName, handler, selector) {
    this._el.addEventListener(eventName, function(event) {
      if (selector) {
        let closest = event.target.closest(selector);

        if (!closest || !this._el.contains(closest)) {
          return;
        }
      }

      handler(event);
    }.bind(this));
  }

  trigger(eventName, data) {
    let customEvent = new CustomEvent(eventName, {
      detail: data
    });

    this._el.dispatchEvent(customEvent);
  }
}

module.exports = BaseComponent;