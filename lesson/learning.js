'use strict';
let appData = {
  expenses: {},
  asking: function() {
    let x, y;
    x = prompt('Введите обязательную статью расходов?');
    y = prompt('Во сколько это обойдеться?', '2000');
    let obj = {
      x: y,
      age: 24,
    };
    appData.expenses = obj;
  },
};
appData.asking();
console.log(appData);