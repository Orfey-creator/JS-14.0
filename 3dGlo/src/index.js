`use strict`;

import countTimer from './modules/countTimer';
import toggleMenu from './modules/toggleMenu';
import togglePopup from './modules/togglePopup';
import tabs from './modules/tabs';
import slider from './modules/slider';
import changeImage from './modules/changeImage';
import ban from './modules/ban';
import calc from './modules/calc';
import sendForm from './modules/sendForm';
//Timer
countTimer("21 september 2020");
//menu
toggleMenu();
//popup
togglePopup();
//Табы
tabs();
//слайдер
slider();
//смена картинок при наведении
changeImage();
//ввод только цифр в рассчете стоимости
ban();
//собственно сам, его величество, калькулятор
calc(100);
//send-ajax-form
sendForm();