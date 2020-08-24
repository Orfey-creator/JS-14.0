'use strict';

let calculateButton = document.getElementById('start');
console.log(calculateButton);

let plusBtnIncome = document.getElementsByTagName('button')[0];
console.log(plusBtnIncome);

let plusBtnExpenses = document.getElementsByTagName('button')[1];
console.log(plusBtnExpenses);

let checkbox = document.querySelector('#deposit-check');
console.log(checkbox);

let additional_income = document.querySelectorAll('.additional_income-item');
console.log(additional_income);

let value = document.getElementsByClassName('result-total');
console.log(value);

let salaryAmount = document.querySelector('.salary-amount');
console.log(salaryAmount);
let incomeTitle = document.querySelector('.income-title');
console.log(incomeTitle);
let incomeAmount = document.querySelector('.income-amount');
console.log(incomeAmount);

let expensesTitle = document.querySelector('input.expenses-title');
console.log(expensesTitle);
let expensesAmount = document.querySelector('.expenses-amount');
console.log(expensesAmount);
let additionalExpensesItem = document.querySelector('.additional_expenses-item');
console.log(additionalExpensesItem);
let targetAmount = document.querySelector('.target-amount');
console.log(targetAmount);
let periodSelect = document.querySelector('.period-select');
console.log(periodSelect);
