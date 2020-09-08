window.addEventListener("DOMContentLoaded", () => {
	// eslint-disable-next-line strict
	"use strict";

	//Timer
	function countTimer(deadline) {
		const timerHours = document.querySelector("#timer-hours"),
			timerMinutes = document.querySelector("#timer-minutes"),
			timerSeconds = document.querySelector("#timer-seconds");

		function getTimeRemaning() {
			const dateStop = new Date(deadline).getTime(),
				dateNow = new Date().getTime(),
				timeRemaning = (dateStop - dateNow) / 1000,
				seconds = Math.floor(timeRemaning % 60),
				minutes = Math.floor((timeRemaning / 60) % 60),
				hours = Math.floor(timeRemaning / 60 / 60);
			return { timeRemaning, hours, minutes, seconds };
		}
		function getZero(num) {
			if (num > 0 && num < 10) {
				return '0' + num;
			} else {
				return num;
			}
		}
		function updateClock() {
			const timer = getTimeRemaning();

			timerHours.textContent = getZero(timer.hours);
			timerMinutes.textContent = getZero(timer.minutes);
			timerSeconds.textContent = getZero(timer.seconds);
			if (timer.timeRemaning < 0) {
				clearInterval(1);
				timerHours.textContent = "0";
				timerMinutes.textContent = "0";
				timerSeconds.textContent = "0";
				timerHours.style.color = "red";
				timerMinutes.style.color = "red";
				timerSeconds.style.color = "red";
			}
		}
		setInterval(updateClock, 1000);
	}

	countTimer("09 september 2020");

	//menu
	const toggleMenu = () => {
		let n = -100;
		let animateMenuInterval;
		const btnMenu = document.querySelector('.menu'),
			menu = document.querySelector('menu'),
			closeBtnMenu = menu.querySelector('.close-btn'),
			itemMenu = menu.querySelectorAll('ul>li'),
			//фия для закрытия/открытия меню
			handlerMenu = () => {
				menu.classList.toggle('active-menu');
			},
			//анимация появления меню
			openAnimateMenu = function() {
				if (document.documentElement.clientWidth >= 768) {
					animateMenuInterval = requestAnimationFrame(openAnimateMenu);
					if (n < 100) {
						n += 20;
						menu.style.transform = 'translate(' + n + '%)';
					} else {
						cancelAnimationFrame(animateMenuInterval);
					}
				}
			},
			//анимация закрытия меню
			closeAnimateMenu = function() {
				animateMenuInterval = requestAnimationFrame(closeAnimateMenu);
				if (n > -100) {
					n -= 20;
					menu.style.transform = 'translate(' + n + '%)';
				} else {
					cancelAnimationFrame(animateMenuInterval);
				}
			};
		// handlerMenu - использует класс для анимации меню
		// open/closeAnimateMenu изменет свойство transform при помощи requestAnimationFrame
		// для выбора способа менять их в btnMenu, closeBtnMenu, itemMenu
		//открытие и закрытие меню
		btnMenu.addEventListener('click', openAnimateMenu);
		//закрытие меню на крестик внутри меню
		closeBtnMenu.addEventListener('click', closeAnimateMenu);
		//Закрытие меню при клике на клик по любому из его пунктов
		itemMenu.forEach(elem => elem.addEventListener('click', closeAnimateMenu));
	};

	toggleMenu();

	//popup
	const togglePopup = () => {
		const popup = document.querySelector('.popup'),
			btnPopup = document.querySelectorAll('.popup-btn'),
			closePopup = document.querySelector('.popup-close');
		//открытие модального окна
		btnPopup.forEach(elem => elem.addEventListener('click', () => {
			popup.style.display = 'block';
		}));
		//закрытие модального окна
		closePopup.addEventListener('click', () => popup.style.display = 'none');
	};
	togglePopup();
});
