'use strict';
//a
let calculateButton = document.getElementById('start'),
//b
    plusBtnIncome = document.getElementsByTagName('button')[0],
    plusBtnExpenses = document.getElementsByTagName('button')[1],
//c
    checkbox = document.querySelector('#deposit-check'),
//d
    additionalIncome = document.querySelectorAll('.additional_income-item'),
//e
    value = document.getElementsByClassName('result-total'),
    
//f
    salaryAmount = document.querySelector('.salary-amount'),
    incomeTitle = document.querySelector('.income-title'),
    incomeItems = document.querySelectorAll('.income-items'),
    expensesTitle = document.querySelector('input.expenses-title'),
    expensesItems = document.querySelectorAll('.expenses-items'),
    additionalExpensesItem = document.querySelector('.additional_expenses-item'),
    targetAmount = document.querySelector('.target-amount'),
    periodSelect = document.querySelector('.period-select');


let isNumber = function (n) {
  return !isNaN(parseFloat(n)) && isFinite(n);
};

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
  start: function () {
    if (salaryAmount.value === '') {
      alert('Ошибка: поле "Месячный доход" должно быть заполнено');
      return;
    }
    
    appData.budget = salaryAmount.value;
    appData.getIncome();
    appData.getExpenses();
    // appData.asking();
    appData.getExpensesMonth();
    appData.getBudget();
    // appData.getTargetMonth();
    // appData.getStatusIncome();
    appData.showResult();
  },
  addIncomeBlock: function() {
    let cloneIncomeItem = incomeItems[0].cloneNode(true);
    incomeItems[0].parentNode.insertBefore(cloneIncomeItem, plusBtnIncome);
    incomeItems = document.querySelectorAll('.income-items');
    if (incomeItems.length === 3) {
      plusBtnIncome.style.display = 'none';
    }
  },
  addExpensesBlock: function () {
    let cloneExpensesItem = expensesItems[0].cloneNode(true);
    expensesItems[0].parentNode.insertBefore(cloneExpensesItem, plusBtnExpenses);
    expensesItems = document.querySelectorAll('.expenses-items');
    if (expensesItems.length === 3) {
      plusBtnExpenses.style.display = 'none';
    }
  },

  getIncome: function() {
    incomeItems.forEach(function(item) {
      let itemIncome = item.querySelector('.income-title').value;
      let cashIncome = parseFloat(item.querySelector('.income-amount').value);
      if (itemIncome !== '' && cashIncome !== '') {
        appData.income[itemIncome] = cashIncome;
      }
    });
  },
  getExpenses: function() {
    expensesItems.forEach(function(item) {
      let itemExpenses = item.querySelector('.expenses-title').value;
      let cashExpenses = parseFloat(item.querySelector('.expenses-amount').value);
      if (itemExpenses !== '' && cashExpenses !== '') {
        appData.expenses[itemExpenses] = cashExpenses;
      }
    });
  },
  showResult: function() {
    value[0].value = appData.budgetMonth;
    value[1].value = appData.budgetDay;
    value[2].value = appData.expensesMonth;
  },
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
    

  },
  budget: 0,
  budgetDay: 0,
  budgetMonth: 0,
  expensesMonth: 0,
  getExpensesMonth: function () {
    let sum = 0;
    for (let key in appData.expenses) {

      parseFloat(sum += appData.expenses[key]);
    }
    appData.expensesMonth = sum;
    return (' Сумма всех обязательных расходов составляет: ' + sum);
  },
  getBudget: function () {
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
  getTargetMonth: function () {
    appData.period = Math.ceil(appData.mission / appData.budgetMonth);
    return (' Цель будет достигнута за ' + appData.period + 'месяца/ев');
  },
  getStatusIncome: function () {
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
      while (!isNumber(appData.percentDeposit));
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

calculateButton.addEventListener('click', appData.start);
plusBtnIncome.addEventListener('click',appData.addIncomeBlock );
plusBtnExpenses.addEventListener('click', appData.addExpensesBlock);


// console.log(appData);
// console.log(appData.expenses);
// console.log(('Цель будет достигнута за ' + appData.period + ' месяца/ев'));


// for (let key in appData) {
//   console.log("Наша программа включает в себя данные: " + key + ' ' + appData[key]);
// }

