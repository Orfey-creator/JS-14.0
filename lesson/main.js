'use strict';

let money;

let isNumber = function (n) {
  return !isNaN(parseFloat(n)) && isFinite(n);
};

let start = function() {
  do {
    money = prompt('Ваш месячный доход?', '20000');
  }

  while (!isNumber(money));
};

start();

let budgetDay = Math.ceil(money / 30);



let appData = {
  income: {},
  addIncome: [],
  expenses: {},
  addExpenses: [],
  deposit: false,
  mission: 50000,
  period: 3,
  asking: function () {
    let addExpenses = prompt('Перечислите возможные расходы за рассчитываемый период через запятую','такси, еда, кутюрьма');
        appData.addExpenses = addExpenses.toLowerCase().split(',');
        appData.deposit = confirm('Есть ли у вас депозит в банке?');
    let obj = new Object();
    for (let i = 0; i < 2; i++) {
      let firstQuestion = prompt('Введите обязательную статью расходов?');
      obj = firstQuestion;
      do {
        let twoQuestion = prompt('Во сколько это обойдеться?', '2000');
        obj[firstQuestion] = twoQuestion;
      }
      while (!isNumber(twoQuestion));
    }
    appData.expenses = obj;
  },
  budget: money,
  budgetDay: 0,
  budgetMonth: 0,
  expensesMonth: 0,
  getExpensesMonth: function () {
    
  },
  getAccumulatedMonth:function () {
    return money - expensesAmount;
  },
  getTargetMonth:function () {
    return appData.mission / AccumulatedMonth;
  },
  getStatusIncome:function () {
    if (budgetDay >= 1200) {
      console.log('У вас высокий уровень дохода');
    } else if (budgetDay >= 600) {
      console.log('У вас средний уровень дохода');
    } else if (budgetDay >= 0) {
      console.log('К сожалению у вас уровень дохода ниже среднего');
    } else if (budgetDay < 0) {
      console.log('Что то пошло не так');
    }
  },
};
appData.asking();
console.log(appData.expenses);
console.log(appData.addExpenses);
let expensesAmount = appData.getExpensesMonth();


// урок 4

console.log('Расходы на месяц '+ expensesAmount);





let AccumulatedMonth = appData.getAccumulatedMonth();
if (appData.getTargetMonth >= 0) {
console.log('Цель будет достигнута через ' + Math.ceil(appData.getTargetMonth()));
} else {
  console.log('Цель не будет достигнута');
}

budgetDay = Math.floor(AccumulatedMonth / 30);
console.log(' Бюджет на день ' + Math.ceil(budgetDay));

appData.getStatusIncome();