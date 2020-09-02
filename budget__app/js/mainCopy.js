'use strict';
//a
const calculateButton = document.getElementById('start'),
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
  expensesTitle = document.querySelector('input.expenses-title'),
  additionalExpensesItem = document.querySelector('.additional_expenses-item'),
  targetAmount = document.querySelector('.target-amount'),
  periodSelect = document.querySelector('.period-select'),
  periodAmount = document.querySelector('.period-amount');
let incomeItems = document.querySelectorAll('.income-items'),
  expensesItems = document.querySelectorAll('.expenses-items');
const cancelButton = document.querySelector('#cancel');
cancelButton.type = 'reset';


const isNumber = function (n) {
  return !isNaN(parseFloat(n)) && isFinite(n);
};

const AppData = function () {
  this.income = {};
  this.addIncome = [];
  this.incomeMonth = 0;
  this.expenses = {};
  this.addExpenses = [];
  this.deposit = false;
  this.percentDeposit = 0;
  this.moneyDeposit = 0;
  this.budget = 0;
  this.budgetDay = 0;
  this.budgetMonth = 0;
  this.expensesMonth = 0;
};
const appData = new AppData();

AppData.prototype.start = function () {

  this.budget = +salaryAmount.value;
  this.check();
  this.getIncome();
  this.getExpenses();
  this.getExpensesMonth();
  this.getBudget();
  // this.getStatusIncome();
  this.getAddExpenses();
  this.getAddIncome();
  this.getPeriodSelect();
  this.showResult();
  this.textBlock();
  calculateButton.style = 'display: none';
  cancelButton.style = 'display: block';
};
AppData.prototype.check = function () {
  //блок кнопки расчета если доход пустой
  if (salaryAmount.value !== '') {
    calculateButton.removeAttribute('disabled');
  }
};

AppData.prototype.reset = function () {
  const resetText = document.querySelectorAll('[type=text]');
  resetText.forEach(function (item) {
    item.value = '';
    item.disabled = false;
  });
  calculateButton.disabled = true;
  calculateButton.style = 'display: block';
  cancelButton.style = 'display: none';
  //возврат массива к исходному состоянию при ресете
  this.income = {};
  this.addIncome = [];
  this.incomeMonth = 0;
  this.expenses = {};
  this.addExpenses = [];
  this.deposit = false;
  this.percentDeposit = 0;
  this.moneyDeposit = 0;
  this.budget = 0;
  this.budgetDay = 0;
  this.budgetMonth = 0;
  this.expensesMonth = 0;
};
AppData.prototype.addIncomeBlock = function () {
  const cloneIncomeItem = incomeItems[0].cloneNode(true);
  incomeItems[0].parentNode.insertBefore(cloneIncomeItem, plusBtnIncome);
  incomeItems = document.querySelectorAll('.income-items');
  if (incomeItems.length === 3) {
    plusBtnIncome.style.display = 'none';
  }

};
AppData.prototype.addExpensesBlock = function () {
  const cloneExpensesItem = expensesItems[0].cloneNode(true);
  expensesItems[0].parentNode.insertBefore(cloneExpensesItem, plusBtnExpenses);
  expensesItems = document.querySelectorAll('.expenses-items');
  if (expensesItems.length === 3) {
    plusBtnExpenses.style.display = 'none';
  }

};

AppData.prototype.getIncome = function () {

  incomeItems.forEach((item) => {
    const itemIncome = item.querySelector('.income-title').value;
    const cashIncome = parseFloat(item.querySelector('.income-amount').value);
    if (itemIncome !== '' && cashIncome !== '') {
      this.income[itemIncome] = cashIncome;
    }
  });
  for (let key in this.income) {
    this.incomeMonth += this.income[key];
  }
};
AppData.prototype.getExpenses = function () {

  expensesItems.forEach((item) => {
    const itemExpenses = item.querySelector('.expenses-title').value;
    const cashExpenses = parseFloat(item.querySelector('.expenses-amount').value);
    if (itemExpenses !== '' && cashExpenses !== '') {
      this.expenses[itemExpenses] = cashExpenses;
    }
  });
};
AppData.prototype.textBlock = function () {
  const blockText = document.querySelectorAll('[type=text]');
  blockText.forEach(function (item) {
    item.disabled = true;
  });
};
AppData.prototype.showResult = function () {
  value[0].value = this.budgetMonth;
  value[1].value = this.budgetDay;
  value[2].value = this.expensesMonth;
  value[4].value = this.addExpenses.join(', ');
  value[3].value = this.addIncome.join(', ');
  value[6].value = this.getTargetMonth();
  value[5].value = this.calcSavedMoney();
  periodSelect.addEventListener('input', this.getPeriodSelect.bind(appData));
};
AppData.prototype.getAddExpenses = function () {

  const addExpenses = additionalExpensesItem.value.split(', ');
  addExpenses.forEach((item) => {
    item = item.trim();
    if (item !== '') {
      this.addExpenses.push(item);
    }
  });
};
AppData.prototype.getAddIncome = function () {

  additionalIncome.forEach((item) => {
    const itemValue = item.value.trim();
    if (item.value !== '') {
      this.addIncome.push(itemValue);
    }
  });
};

AppData.prototype.getPeriodSelect = function () {
  periodAmount.innerHTML = periodSelect.value;
  value[5].value = this.budgetMonth * periodSelect.value;
};

AppData.prototype.getExpensesMonth = function () {
  let sum = 0;
  for (let key in this.expenses) {

    parseFloat(sum += this.expenses[key]);
  }
  this.expensesMonth = sum;
  return (' Сумма всех обязательных расходов составляет: ' + sum);
};

//c use strict не могу поставить this + вопрос про стрелочные фии
AppData.prototype.getBudget = function () {
  const _this = this;

  function getBudgetMonth() {
    appData.budgetMonth = _this.budget + _this.incomeMonth - _this.expensesMonth;
    return _this.BudgetMonth;
  }
  getBudgetMonth();

  function getBudgetDay() {
    _this.budgetDay = Math.floor(_this.budgetMonth / 30);
    return _this.budgetDay;
  }
  getBudgetDay();

};
AppData.prototype.getTargetMonth = function () {
  return Math.ceil(targetAmount.value / this.budgetMonth);

};
AppData.prototype.getStatusIncome = function () {
  if (this.budgetDay >= 1200) {
    return ('У вас высокий уровень дохода');
  } else if (this.budgetDay >= 600) {
    return ('У вас средний уровень дохода');
  } else if (this.budgetDay >= 0) {
    return ('К сожалению у вас уровень дохода ниже среднего');
  } else if (this.budgetDay < 0) {
    return ('Что то пошло не так');
  }
};
AppData.prototype.getInfoDeposit = function () {
  if (this.deposit) {
    do {
      this.percentDeposit = prompt('Какой годовой процент?', 10);
    }
    while (!isNumber(this.percentDeposit));
    do {
      this.moneyDeposit = ('Какая сумма заложена?', 10000);
    }
    while (!isNumber(this.moneyDeposit));
  }
};
AppData.prototype.calcSavedMoney = function () {
  return this.budgetMonth * periodSelect.value;
};
AppData.prototype.eventListeners = function () {
  const _this = this;
  salaryAmount.addEventListener('input', this.check.bind(_this));
  calculateButton.addEventListener('click', this.start.bind(_this));
  //прослушиватель событий
  periodSelect.addEventListener('input', this.getPeriodSelect.bind(_this));
  plusBtnIncome.addEventListener('click', this.addIncomeBlock.bind(_this));
  plusBtnExpenses.addEventListener('click', this.addExpensesBlock.bind(_this));
  cancelButton.addEventListener('click', this.reset.bind(_this));
};

appData.eventListeners();
console.log(appData);
