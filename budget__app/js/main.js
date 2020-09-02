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
  periodAmount = document.querySelector('.period-amount'),
  depositBank = document.querySelector('.deposit-bank'),
  depositAmount = document.querySelector('.deposit-amount'),
  depositPercent = document.querySelector('.deposit-percent');

let incomeItems = document.querySelectorAll('.income-items'),
    expensesItems = document.querySelectorAll('.expenses-items');
const cancelButton = document.querySelector('#cancel');
cancelButton.type = 'reset';


const isNumber = function (n) {
  return !isNaN(parseFloat(n)) && isFinite(n);
};

class AppData {
  constructor() {
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
  }
  start() {

    this.budget = +salaryAmount.value;
    this.check();
    this.getIncome();
    this.getExpenses();
    this.getExpensesMonth();
    this.getInfoDeposit();
    this.getBudget();
    this.getAddExpenses();
    this.getAddIncome();
    this.getPeriodSelect();
    this.showResult();
    this.textBlock();
    calculateButton.style = 'display: none';
    cancelButton.style = 'display: block';
  }
  check () {
    //блок кнопки расчета если доход пустой
    if (salaryAmount.value !== '') {
      calculateButton.removeAttribute('disabled');
    }
  }

  reset () {
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
  }
  addIncomeBlock () {
    const cloneIncomeItem = incomeItems[0].cloneNode(true);
    incomeItems[0].parentNode.insertBefore(cloneIncomeItem, plusBtnIncome);
    incomeItems = document.querySelectorAll('.income-items');
    if (incomeItems.length === 3) {
      plusBtnIncome.style.display = 'none';
    }

  }
  addExpensesBlock () {
    const cloneExpensesItem = expensesItems[0].cloneNode(true);
    expensesItems[0].parentNode.insertBefore(cloneExpensesItem, plusBtnExpenses);
    expensesItems = document.querySelectorAll('.expenses-items');
    if (expensesItems.length === 3) {
      plusBtnExpenses.style.display = 'none';
    }

  }
  getIncome () {

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
  }
  getExpenses () {

    expensesItems.forEach((item) => {
      const itemExpenses = item.querySelector('.expenses-title').value;
      const cashExpenses = parseFloat(item.querySelector('.expenses-amount').value);
      if (itemExpenses !== '' && cashExpenses !== '') {
        this.expenses[itemExpenses] = cashExpenses;
      }
    });
  }
  textBlock () {
    const blockText = document.querySelectorAll('[type=text]');
    blockText.forEach(function (item) {
      item.disabled = true;
    });
  }
  showResult () {
    const _this = this;
    value[0].value = this.budgetMonth;
    value[1].value = this.budgetDay;
    value[2].value = this.expensesMonth;
    value[4].value = this.addExpenses.join(', ');
    value[3].value = this.addIncome.join(', ');
    value[6].value = this.getTargetMonth();
    value[5].value = this.calcSavedMoney();
    periodSelect.addEventListener('input', this.getPeriodSelect.bind(_this));
  }
  getAddExpenses () {

    const addExpenses = additionalExpensesItem.value.split(', ');
    addExpenses.forEach((item) => {
      item = item.trim();
      if (item !== '') {
        this.addExpenses.push(item);
      }
    });
  }
  getAddIncome () {

    additionalIncome.forEach((item) => {
      const itemValue = item.value.trim();
      if (item.value !== '') {
        this.addIncome.push(itemValue);
      }
    });
  }

  getPeriodSelect () {
    periodAmount.innerHTML = periodSelect.value;
    value[5].value = this.budgetMonth * periodSelect.value;
  }

  getExpensesMonth () {
    let sum = 0;
    for (let key in this.expenses) {

      parseFloat(sum += this.expenses[key]);
    }
    this.expensesMonth = sum;
    return (' Сумма всех обязательных расходов составляет: ' + sum);
  }

  //c use strict не могу поставить this + вопрос про стрелочные фии
  getBudget () {
    const _this = this;

    function getMonthDeposit() {
      const monthDeposit = _this.moneyDeposit * _this.percentDeposit / 100;
      return parseFloat(monthDeposit);
    }
    

    function getBudgetMonth() {
      _this.budgetMonth = _this.budget + _this.incomeMonth - _this.expensesMonth + getMonthDeposit();
      return _this.BudgetMonth;
    }
    getBudgetMonth();

    function getBudgetDay() {
      _this.budgetDay = Math.floor(_this.budgetMonth / 30);
      return _this.budgetDay;
    }
    getBudgetDay();

  }
  getTargetMonth () {
    return Math.ceil(targetAmount.value / this.budgetMonth);

  }
  getStatusIncome () {
    if (this.budgetDay >= 1200) {
      return ('У вас высокий уровень дохода');
    } else if (this.budgetDay >= 600) {
      return ('У вас средний уровень дохода');
    } else if (this.budgetDay >= 0) {
      return ('К сожалению у вас уровень дохода ниже среднего');
    } else if (this.budgetDay < 0) {
      return ('Что то пошло не так');
    }
  }
  getInfoDeposit () {
    if (this.deposit) {
      this.percentDeposit = depositPercent.value;
      this.moneyDeposit = parseFloat(depositAmount.value);
    }
  }
  calcSavedMoney () {
    return this.budgetMonth * periodSelect.value;
  }
  changePercent() {
    // const valueSelect = this.value;
    // if ( valueSelect !== '')

    if (depositBank.value === 'other') {
      depositPercent.disabled = false;
      depositPercent.style.display = 'inline-block';
      depositPercent.addEventListener('input', () => {
        console.log('win');
        if (depositPercent.value < 0 || depositPercent.value > 100 || !isNumber(depositPercent.value)) {
          alert('Введите корректное число');
          calculateButton.disabled = true;
        } else {
          calculateButton.disabled = false;
        }
      });
      
    } else if (depositBank.value !== 'other') {
      depositPercent.disabled = true;
      depositPercent.style.display = 'none';
      depositPercent.value = depositBank.value;
    }
  }
  depositHandeler () {
    if (checkbox.checked) {
      depositBank.style.display = 'inline-block';
      depositAmount.style.display = 'inline-block';
      this.deposit = true;
      depositBank.addEventListener('change', this.changePercent); 
      
    } else {
      depositBank.style.display = 'none';
      depositAmount.style.display = 'none';
      depositBank.value = '0';
      depositAmount.value = '';
      this.deposit = false;
      depositBank.removeEventListener('change', this.changePercent);
    }
  }
  eventListeners () {
    const _this = this;
    salaryAmount.addEventListener('input', this.check.bind(_this));
    calculateButton.addEventListener('click', this.start.bind(_this));
    periodSelect.addEventListener('input', this.getPeriodSelect.bind(_this));
    plusBtnIncome.addEventListener('click', this.addIncomeBlock.bind(_this));
    plusBtnExpenses.addEventListener('click', this.addExpensesBlock.bind(_this));
    cancelButton.addEventListener('click', this.reset.bind(_this));
    checkbox.addEventListener('change', this.depositHandeler.bind(this));
    calculateButton.disabled = true;
  }

}
const appData = new AppData();



appData.eventListeners();
console.log(appData);



