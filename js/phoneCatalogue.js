'use strict';

let phone = {
  "age": 0,
  "id": "motorola-xoom-with-wi-fi",
  "imageUrl": "img/phones/motorola-xoom-with-wi-fi.0.jpg",
  "name": "Motorola XOOM\u2122 with Wi-Fi",
  "snippet": "The Next, Next Generation\r\n\r\nExperience the future with Motorola XOOM with Wi-Fi, the world's first tablet powered by Android 3.0 (Honeycomb)."
};

let template = `
  <li class="thumbnail">
    <a href="#!/phones/${phone.id}" class="thumb">
      <img alt="${phone.name}" src="${phone.imageUrl}">
    </a>
    <a href="#!/phones/${phone.id}">${phone.name}</a>
    <p>${phone.snippet}</p>
  </li>
`;

class PhoneCatalogue {
  constructor(options) {
    this._el = options.element;

    this._render(options.phones)
  }

  _render(phones) {
    let html = '<ul class="phones">';

    phones.forEach(phone => {
      html += `
        <li class="thumbnail">
          <a href="#!/phones/${phone.id}" class="thumb">
            <img alt="${phone.name}" src="${phone.imageUrl}">
          </a>
          <a href="#!/phones/${phone.id}">${phone.name}</a>
          <p>${phone.snippet}</p>
        </li>
      `;
    });

    html += '</ul>';

    this._el.innerHTML = html;
  }
}