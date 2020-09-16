const slider = () => {
	const slide = document.querySelectorAll(".portfolio-item"),
		pagDots = document.querySelector(".portfolio-dots"),
		slider = document.querySelector(".portfolio-content");
	let dot = document.querySelectorAll(".dot"),
		currentSlide = 0,
		interval;
	//создание пагинации
	const createPagination = () => {
		const pagination = document.createElement("li");
		pagination.classList.add("dot");
		return pagination;
	};
	//добавление пагинации
	const addPagination = () => {
		slide.forEach(() => {
			pagDots.append(createPagination());
		});
		pagDots.childNodes[1].classList.add("dot-active");
		dot = document.querySelectorAll(".dot");
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
		prevSlide(slide, currentSlide, "portfolio-item-active");
		prevSlide(dot, currentSlide, "dot-active");
		currentSlide++;
		if (currentSlide >= slide.length) {
			currentSlide = 0;
		}
		nextSlide(slide, currentSlide, "portfolio-item-active");
		nextSlide(dot, currentSlide, "dot-active");
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
	slider.addEventListener("click", (event) => {
		event.preventDefault();
		const target = event.target;

		if (!target.matches(".portfolio-btn, .dot")) {
			return;
		}
		prevSlide(slide, currentSlide, "portfolio-item-active");
		prevSlide(dot, currentSlide, "dot-active");
		if (target.matches("#arrow-right")) {
			currentSlide++;
		} else if (target.matches("#arrow-left")) {
			currentSlide--;
		} else if (target.matches(".dot")) {
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
		nextSlide(slide, currentSlide, "portfolio-item-active");
		nextSlide(dot, currentSlide, "dot-active");
	});
	//остановка автопереключения при наведении на слайдер
	slider.addEventListener("mouseenter", (event) => {
		if (event.target.matches(".portfolio-content")) {
			stopSlide();
		}
	});
	//запуск автопереключения если курсор вышел со слайдера
	slider.addEventListener("mouseleave", (event) => {
		if (event.target.matches(".portfolio-content")) {
			startSlide();
		}
	});
	addPagination();
	startSlide();
};
export default slider;