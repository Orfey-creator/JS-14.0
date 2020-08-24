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

let appData = {
  income: {},
  addIncome: [],
  expenses: {},
  addExpenses: [],
  deposit: false,
  percentDeposit: 0,
  moneyDeposit: 0,
  mission: 50000,
  period: 3,
  asking: function () {

    if (confirm('Есть ли у вас дополнительный источник заработка?')) {
      let itemIncome, cashIncome;
      do {
        itemIncome = prompt('Каой у вас дополнительный заработок?', 'Таксую');
      }
      while (isNumber(itemIncome));
      do {
        cashIncome = prompt('Сколько в месяц вы на этом зарабатываете?', 10000);
      }
      while (!isNumber(cashIncome));
      appData.income[itemIncome] = cashIncome;
    }

    do {
      appData.addExpenses = prompt('Перечислите возможные расходы за рассчитываемый период через запятую', 'такси, еда, кутюрьма');
    }
    while (isNumber(appData.addExpenses));
    let string = appData.addExpenses;
    var splits = string.split(" ");
    var stringItog = "";

    for (let i = 0; i < splits.length; i++) {
      let Name = splits[i];
      let First = Name.substring(0, 1).toUpperCase();
      let Leftovers = Name.substring(1, Name.length);
      stringItog += First + Leftovers + " ";
    }
    console.log(stringItog);


    appData.deposit = confirm('Есть ли у вас депозит в банке?');
    let obj = new Object();
    for (let i = 0; i < 2; i++) {
      
      obj[prompt('Введите обязательную статью расходов?')] = +prompt('Во сколько это обойдеться?', '2000');
      appData.expenses = obj;
    }
    
  },
  budget: money,
  budgetDay: 0,
  budgetMonth: 0,
  expensesMonth: 0,
  getExpensesMonth: function () {
    let sum = 0;
    for (let key in appData.expenses) {
      
      sum += appData.expenses[key];
    }
    appData.expensesMonth = sum;
    return (' Сумма всех обязательных расходов составляет: ' + sum);
  },
  getBudget:function () {
    function getBudgetMonth() {
      appData.budgetMonth = appData.budget - appData.expensesMonth;
      return appData.BudgetMonth;
    }
    getBudgetMonth();

    function getBudgetDay() {
      appData.budgetDay = Math.floor(appData.budgetMonth / 30);
      return appData.budgetDay;
    }
    getBudgetDay();

  },
  getTargetMonth:function () {
    appData.period = Math.ceil(appData.mission / appData.budgetMonth);
    return (' Цель будет достигнута за ' + appData.period + 'месяца/ев');
  },
  getStatusIncome:function () {
    if (appData.budgetDay >= 1200) {
      return ('У вас высокий уровень дохода');
    } else if (appData.budgetDay >= 600) {
      return ('У вас средний уровень дохода');
    } else if (appData.budgetDay >= 0) {
      return ('К сожалению у вас уровень дохода ниже среднего');
    } else if (appData.budgetDay < 0) {
      return ('Что то пошло не так');
    }
  },
  getInfoDeposit: function () {
    if (appData.deposit) {
      do {
        appData.percentDeposit = prompt('Какой годовой процент?', 10);
      }
      while (!isNumber(appData.percentDeposit ));
      do {
        appData.moneyDeposit = ('Какая сумма заложена?', 10000);
      }
      while (!isNumber(appData.moneyDeposit));
    }
  },
  calcSavedMoney: function () {
    return appData.budgetMonth * appData.period;

  }
};
appData.asking();
appData.getExpensesMonth();
appData.getBudget();
appData.getTargetMonth();
appData.getStatusIncome();
// console.log(appData);
console.log(appData.expenses);
console.log(('Цель будет достигнута за ' + appData.period + ' месяца/ев'));
console.log(appData.getStatusIncome());

for ( let key in appData) {
  console.log("Наша программа включает в себя данные: " +key +' ' + appData[key]);
}

