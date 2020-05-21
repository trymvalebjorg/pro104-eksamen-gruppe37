/////////////////////////////////////////////////////////////////////////////////////////
//HTML-INNHENTING 
const selectedDateElement = document.querySelector('.duedate__selected');
const calendarTimeReminderElement = document.querySelector('.duedate__picker');
const reminderElement = document.querySelector('.duedate__reminder');
const reminderOutputElement = document.querySelector('.duedate__reminder__output');
const reminderMenuElement = document.querySelector('.duedate__reminder--menu');
const reminderPopUpElement = document.querySelector('.reminder-popup');
let reminderInputValue = document.querySelector("[name='reminder']").value;
const overlayElement = document.querySelector('.overlay');
const reminderButtonElement = document.querySelector('.reminder-popup__button');

//Henter klokkeslett-elementer fra HTML
const duedateTimeElement = document.querySelector('.duedate__picker__time');
const hrElement = document.querySelector('.duedate__picker__time__hour__hr');
const minElement = document.querySelector('.duedate__picker__time__minute__min');
const hrUpElement = document.querySelector('.duedate__picker__time__hour__hr-up');
const hrDownElement = document.querySelector('.duedate__picker__time__hour__hr-down');
const minUpElement = document.querySelector('.duedate__picker__time__minute__min-up');
const minDownElement = document.querySelector('.duedate__picker__time__minute__min-down');

//Henter kalender-elementer fra HTML
const calendarElement = document.querySelector('.duedate__picker__calendar');
const mthElement = document.querySelector('.duedate__picker__calendar__month__mth');
const nextMthElement = document.querySelector('.duedate__picker__calendar__month__nextmth');
const prevMthElement = document.querySelector('.duedate__picker__calendar__month__prevmth');
const daysElement = document.querySelector('.duedate__picker__calendar__days');

/////////////////////////////////////////////////////////////////////////////////////////
//EVENT LISTENERS

//Event listners som trigger funksjon ved klikk
nextMthElement.addEventListener('click', goToNextMonth);
prevMthElement.addEventListener('click', goToPrevMonth);
selectedDateElement.addEventListener('click', toggleActiveClass);
hrUpElement.addEventListener('click', hour_up);
hrDownElement.addEventListener('click', hour_down);
minUpElement.addEventListener('click', minute_up);
minDownElement.addEventListener('click', minute_down);

//Event listners som trigger funksjon ved forandring
hrElement.addEventListener('change', hour_change);
minElement.addEventListener('change', minute_change);
reminderMenuElement.addEventListener('change', chooseReminderTime);

/////////////////////////////////////////////////////////////////////////////////////////

const months = ['Januar', 'Februar', 'Mars', 'April', 'Mai', 'Juni', 'Juli', 'August', 'September', 'Oktober', 'November', 'Desember'];

let currentDate = new Date();
let date = new Date();
let day = date.getDate();
let month = date.getMonth();
let year = date.getFullYear();
let selectedDate = date;
let selectedDay = day;
let selectedMonth = month;
let selectedYear = year;
let hour = date.getHours();
let minute = date.getMinutes();

setTime();
populateDates();

//Legger til måned og år i mthElement
mthElement.textContent = months[month] + ' ' + year;

/////////////////////////////////////////////////////////////////////////////////////////
//FUNKSJONER 

//Legger 0 foran datoen hvis datoen er før den tiende,
function formatDate (d) {
	let day = d.getDate();
	if (day < 10) {
		day = '0' + day;
	}
	return day + ' . ' + months[month].toLowerCase() + ' ' + year + " // " + time ;
}

//Legger til klassen "active" til HTML-elementer
function toggleActiveClass () {
		calendarTimeReminderElement.classList.toggle('active');
		overlayElement.classList.toggle('active');
}

//Øker "månedstall" og årstall, fyller antall dager for måneden, månedsnavn og årstall
function goToNextMonth (e) {
    month++;
	if (month > 11) {
		month = 0;
		year++;
    }
	mthElement.textContent = months[month] + ' ' + year;
    populateDates();
}

//Minsker "månedstall" og årstall, fyller antall dager for måneden, månedsnavn og årstall
function goToPrevMonth (e) {
	month--;
	if (month < 0) {
		month = 11;
		year--;
	}
	mthElement.textContent = months[month] + ' ' + year;
    populateDates();
}

//Fyller inn datoer i kalenderen
function populateDates (e) {
    daysElement.innerHTML = '';
    let amountDaysInMonth = [31,28,30,29];

//Justerer antall dager som vises utifra ulike måneder og skuddår
    if ( (month == 1) && (year % 4 == 0) && (year % 100 != 0) || (year % 400 == 0)){
        amountDays = amountDaysInMonth[3];
    } else if ( month == 1 ){ 
        amountDays = amountDaysInMonth [1];
    } else {
        if ( month == 0 || month == 2 || month ==  4 || month ==  6 || month == 7 || month ==  9 || month ==  11) {
            amountDays = amountDaysInMonth[0];
        }else if ( month == 3 || month == 5 || month ==  8 || month ==  10 ) {
            amountDays = amountDaysInMonth[2];
        } 
    }

//Lager div'er med datoer utifra antall dager i måneden
	for (let i = 0; i < amountDays; i++) {
		const dayElement = document.createElement('div');
		dayElement.classList.add('day');
		dayElement.textContent = i + 1;

		if (selectedDay == (i + 1) && selectedYear == year && selectedMonth == month) {
			dayElement.classList.add('selected');
		}

//Dersom en dato klikkes på oppdateres teksten i selectedDateElement samt verdien
		dayElement.addEventListener('click', function () {
			selectedDate = new Date(year + '-' + (month + 1) + '-' + (i + 1));
			selectedDay = (i + 1);
			selectedMonth = month;
			selectedYear = year;
			selectedTime = selectedDate.setHours(hour, minute);
			selectedDateElement.textContent = formatDate(selectedDate);
			selectedDateElement.dataset.value = selectedDate;
			populateDates();
		});
		
		daysElement.appendChild(dayElement);
	}
}

/*Dersom det skrives et tall over 23 settes talles til 23, eller 0 dersom tallet er under 0
  Oppdaterer selectedDate og selectedDateElement */
function hour_change (e) {
	if (e.target.value > 23) {
		e.target.value = 23;
	} else if (e.target.value < 0) {
		e.target.value = '00';
	}

	if (e.target.value == "") {
		e.target.value = formatTime(hour);
	}
	hour = e.target.value;

	hrElement.value = formatTime(hour);
	minElement.value = formatTime(minute);
    duedateTimeElement.dataset.time = formatTime(hour) + ':' + formatTime(minute);
	time = formatTime(hour) + ':' + formatTime(minute);
	selectedDate.setHours(hrElement.value, minElement.value);
	selectedDateElement.textContent = formatDate(date);
}

/*Dersom det skrives et tall over 59 settes talles til 59, eller 0 dersom tallet er under 0
  Oppdaterer selectedDate og selectedDateElement */
function minute_change (e) {
	if (e.target.value > 59) {
		e.target.value = 59;
	} else if (e.target.value < 0) {
		e.target.value = '00';
	}

	if (e.target.value == "") {
		e.target.value = formatTime(minute);
	}
	minute = e.target.value;

	hrElement.value = formatTime(hour);
	minElement.value = formatTime(minute);
    duedateTimeElement.dataset.time = formatTime(hour) + ':' + formatTime(minute);
	time = formatTime(hour) + ':' + formatTime(minute);
	selectedDate.setHours(hrElement.value, minElement.value);
	selectedDateElement.textContent = formatDate(date);
}

//Øker timer, dersom timen er større enn 23 endres tallet til 0
function hour_up () {
	hour++;
	if (hour > 23) {
		hour = 0;
	}
	setTime();
}

//Minsker timer, dersom timen er mindre enn 0 endres tallet til 23
function hour_down () {
	hour--;
	if (hour < 0) {
		hour = 23;
	}
	setTime();
}

//Øker minutter, dersom minuttene er større enn 59 endres tallet til 0
function minute_up () {
	minute++;
	if (minute > 59) {
		minute = 0;
		hour++;
	}
    setTime();
}

//Minsker minutter, dersom minutter er mindre enn 0 endres tallet til 59
function minute_down () {
	minute--;
	if (minute < 0) {
		minute = 59;
		hour--;
	}
	setTime();
}

//Legger til time og minutter til selectedDateElement og oppdaterer selectedDate tid
function setTime () {
	hrElement.value = formatTime(hour);
	minElement.value = formatTime(minute);
    duedateTimeElement.dataset.time = formatTime(hour) + ':' + formatTime(minute);
	time = formatTime(hour) + ':' + formatTime(minute);
	selectedDate.setHours(hrElement.value, minElement.value, 0);
	selectedDateElement.textContent = formatDate(date);
}

//Legger til 0 foran tiden dersom klokken er under 10
function formatTime (time) {
	if (time < 10) {
		time = '0' + time;
	}
	return time;
}

//Legger til klassen "active" til reminderPopUpElement
function showReminderPopUp(){
	reminderPopUpElement.classList.toggle('active');
	overlayElement.classList.add('active');
	reminderButtonElement.addEventListener('click', overlayToggle);
}

//Trigger funksjonen showReminderPopUp etter nedtelling av millisekunder 
function chooseReminderTime(){
	let reminderDefaultValue = document.querySelector(".duedate__reminder--menu__default");
	let reminderInputValue = document.querySelector("[name='reminder']").value;
	let currentDate = new Date();

	switch (reminderInputValue){
		case "1min":
			const minInMs = 60000;
			window.setTimeout(showReminderPopUp, selectedDate - currentDate - minInMs);
			break;

		case "5min":
			const fiveMinInMs = 300000;
			window.setTimeout(showReminderPopUp, selectedDate - currentDate - fiveMinInMs);
			break;

		case "15min":
			const fifteenMinInMs = 900000;
			window.setTimeout(showReminderPopUp, selectedDate - currentDate - fifteenMinInMs);
			break;

		case "30min":
			const thirtyMinInMs = 1800000;
			window.setTimeout(showReminderPopUp, selectedDate - currentDate - thirtyMinInMs);
			break;

		case "1hr":
			const oneHourInMs = 3600000;
			window.setTimeout(showReminderPopUp, selectedDate - currentDate - oneHourInMs);
			break;
		
		case "2hr":
			const twoHoursInMs = 7200000;
			window.setTimeout(showReminderPopUp, selectedDate - currentDate - twoHoursInMs);
			break;

		case "1day":
			const oneDayInMs = 86400000;
			window.setTimeout(showReminderPopUp, selectedDate - currentDate - oneDayInMs);
			break;

		case "remove":
				reminderDefaultValue.selected = true;
			break;
	}
}

function overlayToggle() {
	overlayElement.classList.toggle('active');
	if (calendarTimeReminderElement.className === 'duedate__picker active'){
		calendarTimeReminderElement.classList.remove('active');
	}

	if (reminderPopUpElement.className === 'reminder-popup active'){
		overlayElement.classList.add('active');
	}
}