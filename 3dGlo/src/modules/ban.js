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
};
//ввод только цифр в номере телефона
const tel = document.querySelectorAll("input[type=tel]");
tel.forEach((elem) => {
	// Проверяем фокус
	elem.addEventListener("focus", () => {
		// Если там ничего нет или есть, но левое
		if (!/^\+\d*$/.test(elem.value)) {
			// То вставляем знак плюса как значение
			elem.value = "+";
		}
	});

	elem.addEventListener("keypress", (e) => {
		// Отменяем ввод не цифр
		if (!/\d/.test(e.key)) {
			e.preventDefault();
		}
	});
});
//проверка на число
const isNumber = function (n) {
	return !isNaN(parseFloat(n)) && isFinite(n);
};
//запрет ввода цифр сообщении и имени пользователя
const text = document.querySelectorAll(
	"input[name=user_name], input[name=user_message]"
);
text.forEach((elem) => {
	elem.addEventListener("input", (e) => {
		if (isNumber(e.data)) {
			elem.value = "";
		}
	});
});
export default ban;