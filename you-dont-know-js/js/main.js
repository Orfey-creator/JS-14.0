'use strict';
//расставляем книги по порядк
const books = document.querySelectorAll('.book');

books[0].before(books[1]);
books[3].before(books[4]);
books[5].after(books[2]);

//убираем рекламу
document.querySelector('.adv').remove();

//меняем bgi
document.querySelector('body').style.backgroundImage = 'url(image/you-dont-know-js.jpg)';

//исправляеи ошибку в title книги 3
document.querySelectorAll('a')[2].innerText = 'Книга 3. this и Прототипы Объектов';

//расставляем по порядку главы в книге 2
let bookTwo = document.querySelectorAll('ul')[1];
let bookTwoLi = bookTwo.querySelectorAll('li');

bookTwoLi[3].after(bookTwoLi[6]);
bookTwoLi[6].after(bookTwoLi[8]);
bookTwoLi[9].after(bookTwoLi[2]);

//расставляем по порядку главы в книге 5
let bookFive = document.querySelectorAll('ul')[4];
let bookFiveLi = bookFive.querySelectorAll('li');

bookFiveLi[1].after(bookFiveLi[9]);
bookFiveLi[9].after(bookFiveLi[3]);
bookFiveLi[3].after(bookFiveLi[4]);
bookFiveLi[7].after(bookFiveLi[5]);

//добавляем главу 8
let newElem = document.createElement('li');
newElem.textContent = 'Глава 8: За пределами ES6';
console.log(newElem);
let chapterEight = document.querySelectorAll('ul')[5];
let chapterEightLi = chapterEight.querySelectorAll('li');
chapterEightLi[8].after(newElem);
