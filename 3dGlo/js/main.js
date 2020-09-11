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

	countTimer("12 september 2020");

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
		btnPopup.forEach((elem) => elem.addEventListener('click', openAnimatePopup));
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
		const toggleTabContent = (index) => {
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
		tabHeader.addEventListener('click', (event) => {
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

	//слайдер
	const slider = () => {
		const slide = document.querySelectorAll('.portfolio-item'),
			pagDots = document.querySelector('.portfolio-dots'),
			slider = document.querySelector('.portfolio-content');
		let dot = document.querySelectorAll('.dot'),
			currentSlide = 0,
			interval;
		//создание пагинации
		const createPagination = () => {
			const pagination = document.createElement('li');
			pagination.classList.add('dot');
			return pagination;
		};
		//добавление пагинации
		const addPagination = () => {
			slide.forEach(() => {
				pagDots.append(createPagination());
			});
			pagDots.childNodes[1].classList.add('dot-active');
			dot = document.querySelectorAll('.dot');
		};
		//предыдщий слайд
		const prevSlide = (elem, index, strClass) => {
			elem[index].classList.remove(strClass);
		};
		//следующий слайд
		const nextSlide = (elem, index, strClass) => {
			elem[index].classList.add(strClass);
		};
		//переключение слайдера
		const autoPlay = () => {
			prevSlide(slide, currentSlide, 'portfolio-item-active');
			prevSlide(dot, currentSlide, 'dot-active');
			currentSlide++;
			if (currentSlide >= slide.length) {
				currentSlide = 0;
			}
			nextSlide(slide, currentSlide, 'portfolio-item-active');
			nextSlide(dot, currentSlide, 'dot-active');
		};
		//интервал автопереключения
		const startSlide = (time = 3) => {
			interval = setInterval(autoPlay, time * 1000);
		};
		//отсановить автопереключение
		const stopSlide = () => {
			clearInterval(interval);
		};
		//переключение при нажатии на стрелку или пагинацию
		slider.addEventListener('click', (event) => {
			event.preventDefault();
			const target = event.target;

			if (!target.matches('.portfolio-btn, .dot')) {
				return;
			}
			prevSlide(slide, currentSlide, 'portfolio-item-active');
			prevSlide(dot, currentSlide, 'dot-active');
			if (target.matches('#arrow-right')) {
				currentSlide++;
			} else if (target.matches('#arrow-left')) {
				currentSlide--;
			} else if (target.matches('.dot')) {
				dot.forEach((elem, index) => {
					if (elem === target) {
						currentSlide = index;
					}
				});
			}
			if (currentSlide >= slide.length) {
				currentSlide = 0;
			}
			if (currentSlide < 0) {
				currentSlide = slide.length - 1;
			}
			nextSlide(slide, currentSlide, 'portfolio-item-active');
			nextSlide(dot, currentSlide, 'dot-active');
		});
		//остановка автопереключения при наведении на слайдер
		slider.addEventListener('mouseenter', (event) => {
			if (event.target.matches('.portfolio-content')) {
				stopSlide();
			}
		});
		//запуск автопереключения если курсор вышел со слайдера
		slider.addEventListener('mouseleave', (event) => {
			if (event.target.matches('.portfolio-content')) {
				startSlide();
			}
		});
		addPagination();
		startSlide();
	};
	slider();

	//смена картинок при наведении
	const image = document.querySelectorAll('.command__photo');
	image.forEach((elem) => {
		const img = elem.src;
		elem.addEventListener('mouseenter', (e) => {
			e.target.src = e.target.dataset.img;
		});
		elem.addEventListener('mouseout', (e) => {
			e.target.src = img;
		});
	});
	//ввод только цифр в рассчете стоимости
	const calcBlock = document.querySelector('.calc-block');
	console.log(calcBlock);
	calcBlock.addEventListener('input', (e) => {
		if (e.target.matches('.calc-item')) {
			if (isNaN(e.target.value)) {
				e.target.value = '';
			}
		}
	});
});
