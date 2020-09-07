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

	countTimer("08 september 2020");
});
