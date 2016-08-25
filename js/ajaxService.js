'use strict';

module.exports = {
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
};