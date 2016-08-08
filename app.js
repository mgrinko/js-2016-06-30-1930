'use strict';

var data = {
  "Рыбы": {
    "Форель": {},
    "Щука": {}
  },

  "Деревья": {
    "Хвойные": {
      "Лиственница": {},
      "Ель": {}
    },
    "Цветковые": {
      "Берёза": {},
      "Тополь": {
        "Цветковые": {
          "Берёза": {},
          "Тополь": {}
        }
      }
    }
  }
};




new Tree(document.getElementById('container1'), data);
new Tree(document.getElementById('container2'), data['Рыбы']);
new Tree(document.getElementById('container3'), data['Деревья']);