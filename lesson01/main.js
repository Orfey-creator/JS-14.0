let money = 20000;
let income = 'фриланс';
let addExpenses = 'Интернет, Такси, Коммуналка';
let deposit = true;
let mission = 5e6;
let period = 12;

console.log(typeof(money));
console.log(typeof (income));
console.log(typeof (deposit));

console.log(addExpenses.length);

console.log('Период равен '+period);
console.log('Цель заработать '+mission+' юаней');

addExpenses.toLowerCase();
console.log(addExpenses.split(','));

const budgetDay = money/=30;
console.log(budgetDay);