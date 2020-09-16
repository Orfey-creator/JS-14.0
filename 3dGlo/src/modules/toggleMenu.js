const toggleMenu = () => {
	let n = -100;
	let animateMenuInterval;

	const btnMenu = document.querySelector(".menu"),
		menu = document.querySelector("menu"),
		closeBtnMenu = menu.querySelector(".close-btn"),
		itemMenu = menu.querySelectorAll("ul>li"),
		//фия для закрытия/открытия меню
		handlerMenu = () => {
			menu.classList.toggle("active-menu");
		},
		//анимация появления меню
		openAnimateMenu = function () {
			if (document.documentElement.clientWidth >= 768) {
				animateMenuInterval = requestAnimationFrame(openAnimateMenu);
				if (n < 100) {
					n += 20;
					menu.style.transform = "translate(" + n + "%)";
				} else {
					cancelAnimationFrame(animateMenuInterval);
				}
			} else {
				menu.style.transform = "translate(100%)";
			}
		},
		//анимация закрытия меню
		closeAnimateMenu = function () {
			animateMenuInterval = requestAnimationFrame(closeAnimateMenu);
			if (n > -100) {
				n -= 20;
				menu.style.transform = "translate(" + n + "%)";
			} else {
				cancelAnimationFrame(animateMenuInterval);
				menu.style.transform = "translate(-100%)";
			}
		};
	// handlerMenu - использует класс для анимации меню
	// open/closeAnimateMenu изменет свойство transform при помощи requestAnimationFrame
	// для выбора способа менять их в btnMenu, closeBtnMenu, itemMenu
	//открытие и закрытие меню
	btnMenu.addEventListener("click", openAnimateMenu);
	//закрытие меню на крестик внутри меню
	//Закрытие меню при клике на клик по любому из его пунктов
	menu.addEventListener("click", (event) => {
		const target = event.target;
		if (target.classList.contains("close-btn")) {
			closeAnimateMenu();
		} else if (target.matches("a")) {
			closeAnimateMenu();
		}
	});
};
export default toggleMenu;