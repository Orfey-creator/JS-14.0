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

	countTimer("11 september 2020");

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
				} else {
					menu.style.transform = 'translate(100%)';
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
					menu.style.transform = 'translate(-100%)';
				}
			};
		// handlerMenu - использует класс для анимации меню
		// open/closeAnimateMenu изменет свойство transform при помощи requestAnimationFrame
		// для выбора способа менять их в btnMenu, closeBtnMenu, itemMenu
		//открытие и закрытие меню
		btnMenu.addEventListener('click', openAnimateMenu);
		//закрытие меню на крестик внутри меню
		//Закрытие меню при клике на клик по любому из его пунктов
		menu.addEventListener('click', (event) => {
			const target = event.target;
			if (target.classList.contains('close-btn')) {
				closeAnimateMenu();
			} else if (target.matches('a')) {
				closeAnimateMenu();
			}
		});
	};

	toggleMenu();

	//popup
	const togglePopup = () => {
		let animatePopupInterval;
		let n = 0;
		const popup = document.querySelector('.popup'),
			btnPopup = document.querySelectorAll('.popup-btn'),
			closePopup = document.querySelector('.popup-close');
		//анимация открытия модального окна
		const openAnimatePopup = function() {
				popup.style.display = 'block';
				if (document.documentElement.clientWidth >= 768) {
					animatePopupInterval = requestAnimationFrame(openAnimatePopup);
					if (n < 1) {
						n += 0.03;
						popup.style.opacity = n;
						console.log(n);
					} else {
						cancelAnimationFrame(animatePopupInterval);
					}
				}
			},
			//анимация закрытия модльного окна
			closeAnimatePopup = function() {
				animatePopupInterval = requestAnimationFrame(closeAnimatePopup);
				if (n > 0) {
					n -= 0.05;
					popup.style.opacity = n;
					console.log(n);
				} else {
					popup.style.display = 'none';
					cancelAnimationFrame(animatePopupInterval);
				}
			};
		//открытие модального окна
		btnPopup.forEach(elem => elem.addEventListener('click', openAnimatePopup));
		//закрытие модального окна
		popup.addEventListener('click', (event) => {
			let target = event.target;
			if (target.classList.contains('popup-close')) {
				closeAnimatePopup();
			} else {
				target = target.closest('.popup-content');
				console.log(target);
				if (!target) {
					closeAnimatePopup();
				}
			}
		});
	};
	togglePopup();

	//Табы
	const tabs = () => {
		const tabHeader = document.querySelector('.service-header'),
			tab = tabHeader.querySelectorAll('.service-header-tab'),
			tabContent = document.querySelectorAll('.service-tab');
		const toggleTabContent = index => {
			for (let i = 0; i < tabContent.length; i++) {
				if (index === i) {
					tab[i].classList.add('active');
					tabContent[i].classList.remove('d-none');
				} else {
					tab[i].classList.remove('active');
					tabContent[i].classList.add('d-none');
				}
			}
		};
		tabHeader.addEventListener('click', event => {
			let target = event.target;
			target = target.closest('.service-header-tab');
			if (target) {
				tab.forEach((item, i) => {
					if (item === target) {
						toggleTabContent(i);
					}
				});
			}
		});
	};
	tabs();
});
