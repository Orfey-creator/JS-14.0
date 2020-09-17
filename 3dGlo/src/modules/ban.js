const ban = () => {
	//ввод только цифр в рассчете стоимости
	const calcBlock = document.querySelector(".calc-block");
	calcBlock.addEventListener("input", (e) => {
		if (e.target.matches(".calc-item")) {
			if (isNaN(e.target.value)) {
				e.target.value = "";
			}
		}
	});
	//ввод только цифр в номере телефона
	const tel = document.querySelectorAll("input[type=tel]");
	tel.forEach((elem) => {
		// Проверяем фокус
		elem.addEventListener("input", () => {
			if (isNumber(elem.value) || elem.value === "+") {
				return;
			} else {
				elem.value = '';
			}
		});
	});
	//проверка на число
	const isNumber = function(n) {
		return !isNaN(parseFloat(n)) && isFinite(n);
	};
	//запрет ввода цифр сообщении и имени пользователя
	const text = document.querySelectorAll(
		"input[name=user_name], input[name=user_message]"
	);
	const en = /a|b|c|d|e|f|g|h|i|j|k|l|m|n|o|p|q|r|s|t|u|v|w|x|y|z/gi;
	const ru = /а|б|в|г|д|е|ё|ж|з|и|й|ё|к|л|м|н|о|п|р|с|т|у|ф|х|ц|ч|ш|щ|ъ|ы|ь|э|ю|я| /gi;
	text.forEach((elem) => {
		elem.addEventListener("input", (e) => {
			if (ru.test(e.target.value)) {
				return;
			} else {
				e.target.value = '';
			}

		});
	});
};

export default ban;
