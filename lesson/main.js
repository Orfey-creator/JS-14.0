'use strict';

let isNumber = function(n) {
  return !isNaN(parseFloat(n)) && isFinite(n);
};

let money;
let income = 'фриланс';
let addExpenses = 'Интернет, Такси, Коммуналка';
let deposit = true;
let mission = 5e6;
let period = 12;

let start = function() {
  do {
    money = prompt('Ваш месячный доход?');
  }

  while (!isNumber(money));
};

start();

let showTypeOf = function(data) {
  console.log(data, typeof(data));
};

showTypeOf(money);
showTypeOf(income);
showTypeOf(deposit);

let budgetDay = Math.ceil(money / 30);

addExpenses = prompt('Перечислите возможные расходы за рассчитываемый период через запятую');

let getStatusIncome = function() {
  if (budgetDay >= 1200) {
    console.log('У вас высокий уровень дохода');
  } else if (budgetDay >= 600) {
    console.log('У вас средний уровень дохода');
  } else if (budgetDay >= 0) {
    console.log('К сожалению у вас уровень дохода ниже среднего');
  } else if (budgetDay < 0) {
    console.log('Что то пошло не так');
  }
};

// урок 4
let expenses = [];

let getExpensesMonth = function() {
  let sum = 0;
  let check;
  
  for (let i = 0; i < 2; i++) {

    
    expenses[i] = prompt('Введите обязательную статью расходов?');
    
    do {
      check = +prompt('Во сколько это обойдеться?');
    }
    while (!isNumber(check));
    sum+=check;
  }
  console.log(expenses);
  return sum;
};

addExpenses.toLowerCase();
console.log(addExpenses.split(','));

let expensesAmount = getExpensesMonth();

console.log('Расходы на месяц '+ expensesAmount);

let getAccumulatedMonth = function() {
  return money - expensesAmount;
};

let AccumulatedMonth = getAccumulatedMonth();

let getTargetMonth = function() {
  return mission / AccumulatedMonth;
};
if (getTargetMonth >= 0) {
console.log('Цель будет достигнута через ' + Math.ceil(getTargetMonth()));
} else {
  console.log('Цель не будет достигнута');
}

budgetDay = Math.floor(AccumulatedMonth / 30);
console.log(' Бюджет на день ' + Math.ceil(budgetDay));

getStatusIncome();