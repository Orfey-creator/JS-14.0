// Добрый день(утро, вечер, ночь в зависимости от времени суток)
// Сегодня: Понедельник
// Текущее время: 12: 05: 15 PM
// До нового года осталось 175 дней


// eslint-disable-next-line strict
'use strict';
function importHtml(timesOfDay, day, time, newYear) {
	const div = document.createElement('div');
	div.innerHTML = '<h3>' + timesOfDay + '</h3>' + '<span>Сегодня: ' + day + '</span>' + '<br>' + '<span>Текущее время: ' + time + '</span>' + '<br>' + '<span>До нового года осталось ' + newYear + ' дней</span>';
	document.querySelector('body').append(div);
}
function getParams() {
	const date = new Date(),
		days = ['воскресенье', 'понедельник', 'вторник', 'среда', 'четверг', 'пятница', 'суббота'],
		day = days[date.getDay()],
		time = date.getHours() + ':' + date.getMinutes() + ':' + date.getSeconds();
	let	newYear = new Date('01 january 2021');
	newYear = Math.ceil((newYear.getTime() - date.getTime()) / 1000 / 60 / 60 / 24);
	let timesOfDay;
	if (date.getHours >= '18') {
		timesOfDay = 'Добрый вечер';
	} else if (date.getHours <= '12') {
		timesOfDay = 'Доброе утро';
	} else {
		timesOfDay = 'Добрый день';
	}
	return {timesOfDay, day, time, newYear};
}
const timeParams = getParams();
importHtml(timeParams.timesOfDay, timeParams.day, timeParams.time, timeParams.newYear);
