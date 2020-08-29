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
    periodSelect = document.querySelector('.period-select'),
    periodAmount = document.querySelector('.period-amount');

let isNumber = function (n) {
  return !isNaN(parseFloat(n)) && isFinite(n);
};

let appData = {
  income: {},
  addIncome: [],
  incomeMonth: 0,
  expenses: {},
  addExpenses: [],
  deposit: false,
  percentDeposit: 0,
  moneyDeposit: 0,
  start: function () {
    appData.budget = +salaryAmount.value;
    appData.getIncome();
    appData.getExpenses();
    appData.getExpensesMonth();
    appData.getBudget();
    // appData.getStatusIncome();
    appData.getAddExpenses();
    appData.getAddIncome();
    appData.getPeriodSelect();
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
    for (let key in appData.income) {
      appData.incomeMonth += appData.income[key];
    }
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
    value[4].value = appData.addExpenses.join(', ');
    value[3].value = appData.addIncome.join(', ');
    value[6].value = appData.getTargetMonth();
    value[5].value = appData.calcSavedMoney();
    periodSelect.addEventListener('input', appData.getPeriodSelect);
  },
  getAddExpenses: function() {
    let addExpenses = additionalExpensesItem.value.split(', ');
    addExpenses.forEach(function(item){
      item = item.trim();
      if (item !== '') {
        appData.addExpenses.push(item);
      }
    });
  },
  getAddIncome: function() {
    additionalIncome.forEach(function(item) {
      let itemValue = item.value.trim();
      if (item.value !== '') {
        appData.addIncome.push(itemValue);
      }
    });
  },
  
  getPeriodSelect: function() {
    periodAmount.innerHTML = periodSelect.value;
    value[5].value = appData.incomeMonth * periodSelect.value;
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
      appData.budgetMonth = appData.budget + appData.incomeMonth - appData.expensesMonth;
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
    return Math.ceil(targetAmount.value / appData.budgetMonth);
    
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
    return appData.budgetMonth * periodSelect.value;

  }
};
calculateButton.disabled = true;
salaryAmount.addEventListener('input', function(){
  if (salaryAmount.value !== '') {
    calculateButton.disabled = false;
    calculateButton.addEventListener('click', appData.start);
  }
  else {
    calculateButton.disabled = true;
  }
});

periodSelect.addEventListener('input', appData.getPeriodSelect);
plusBtnIncome.addEventListener('click',appData.addIncomeBlock );
plusBtnExpenses.addEventListener('click', appData.addExpensesBlock);


