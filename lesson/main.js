'use strict';
let money = 20000;
let income = 'фриланс';
let addExpenses = 'Интернет, Такси, Коммуналка';
let deposit = true;
let mission = 5e6;
let period = 12;

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

let budgetDay = money/=30;
// console.log(budgetDay);

money = prompt('Ваш месячный доход?');
addExpenses = prompt('Перечислите возможные расходы за рассчитываемый период через запятую');
deposit = confirm('Есть ли у вас депозит в банке?');
let expenses1 = prompt('Введите обязательную статью расходов?');
let amount1 = +prompt('Во сколько это обойдется?');
let expenses2 = prompt('Введите обязательную статью расходов?');
let amount2 = +prompt('Во сколько это обойдется?');

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
let getExpensesMonth = function() {
  return amount1 + amount2;
};

console.log(getExpensesMonth());

let getAccumulatedMonth = function() {
  return money - getExpensesMonth();
};

let AccumulatedMonth = getAccumulatedMonth();

let getTargetMonth = function() {
  return mission / AccumulatedMonth;
};
console.log('Цель будет достигнута через ' + getTargetMonth());

budgetDay = Math.floor(AccumulatedMonth / 30);
console.log(' Бюджет на день ' + budgetDay);

getStatusIncome();