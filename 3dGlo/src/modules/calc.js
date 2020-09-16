const calc = (price = 100) => {
	const calcBlock = document.querySelector(".calc-block");
	const calcType = document.querySelector(".calc-type"),
		calcSquare = document.querySelector(".calc-square"),
		calcDay = document.querySelector(".calc-day"),
		calcCount = document.querySelector(".calc-count"),
		totalValue = document.getElementById("total");
	const countSum = () => {
		let total = 0,
			countValue = 1,
			dayValue = 1,
			typeValue = calcType.options[calcType.selectedIndex].value,
			squaeValue = +calcSquare.value;
		if (calcCount.value > 1) {
			countValue += (calcCount.value - 1) / 10;
		}

		if (calcDay.value && calcDay.value < 5) {
			dayValue *= 2;
		} else if (calcDay.value && calcDay.value < 10) {
			dayValue *= 1.5;
		}

		if (typeValue && squaeValue) {
			total = price * typeValue * squaeValue * countValue * dayValue;
		} else {
			total = 0;
		}

		totalValue.textContent = total;
	};
	calcBlock.addEventListener("change", (e) => {
		if (e.target.matches(".calc-item")) {
			countSum();
		}
	});
};
export default calc;