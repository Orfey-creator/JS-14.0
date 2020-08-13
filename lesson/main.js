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


// console.log(addExpenses.length);

// console.log('Период равен '+period);
// console.log('Цель заработать '+mission+' юаней');

addExpenses.toLowerCase();
console.log(addExpenses.split(','));

let budgetDay = Math.ceil(money / 30);
// console.log('Дневной бюджет составляет ' + budgetDay);

// money = prompt('Ваш месячный доход?');
addExpenses = prompt('Перечислите возможные расходы за рассчитываемый период через запятую');
// deposit = confirm('Есть ли у вас депозит в банке?');
// let expenses1 = prompt('Введите обязательную статью расходов?');
// let amount1 = +prompt('Во сколько это обойдется?');
// let expenses2 = prompt('Введите обязательную статью расходов?');
// let amount2 = +prompt('Во сколько это обойдется?');

// let budgetMonth = money - amount1 - amount2;
// console.log('Бюджет на месяца равен ' + budgetMonth);

// let period1 = Math.ceil(mission / (money - (amount1 + amount2)));
// console.log('Цель будет достигнута через ' + period1 + ' месяцев');

// budgetDay = Math.floor(budgetMonth / 30);
// console.log(' Бюджет на деннь ' + budgetDay);

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
  console.log(Math.ceil(expenses));
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