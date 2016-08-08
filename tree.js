'use strict';

class Tree {
  constructor(element, data) {
    element.appendChild(this._createTreeDom(data));
  }

  _createTreeDom(obj) {
    // если нет детей, то рекурсивный вызов ничего не возвращает
    // так что вложенный UL не будет создан
    if (this._isObjectEmpty(obj)) {
      return;
    }

    var ul = document.createElement('ul');

    for (let key in obj) {
      let li = document.createElement('li');
      let span = document.createElement('span');

      span.textContent = key;
      span.onclick = this._onItemClick;

      li.appendChild(span);

      var childrenUl = this._createTreeDom(obj[key]);

      if (childrenUl) {
        li.appendChild(childrenUl);
      }

      ul.appendChild(li);
    }

    return ul;
  }

  _onItemClick(e) {
    event.target.closest('li').classList.toggle('closed');
  };

  _isObjectEmpty(obj) {
    for (var key in obj) {
      return false;
    }
    return true;
  }
}