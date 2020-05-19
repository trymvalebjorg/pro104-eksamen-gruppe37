//Henter klokkeslett-elementer fra HTML
const timepickerElement = document.querySelector('.timepicker');
let time = timepickerElement.dataset.time;
const hrElement = document.querySelector('.timepicker__hour__hr');
const minElement = document.querySelector('.timepicker__minute__min');
const hrUpElement = document.querySelector('.timepicker__hour__hr-up');
const hrDownElement = document.querySelector('.timepicker__hour__hr-down');
const minUpElement = document.querySelector('.timepicker__minute__min-up');
const minDownElement = document.querySelector('.timepicker__minute__min-down');

//Henter dato-elementer fra HTML
const datepickerElement = document.querySelector('.datepicker');
const selectedDateElement = document.querySelector('.datepicker__dateselected');
const datesElement = document.querySelector('.datepicker__dates');
const mthElement = document.querySelector('.datepicker__dates__month__mth');
const nextMthElement = document.querySelector('.datepicker__dates__month__nextmth');
const prevMthElement = document.querySelector('.datepicker__dates__month__prevmth');
const daysElement = document.querySelector('.datepicker__dates__days');

const months = ['Januar', 'Februar', 'Mars', 'April', 'Mai', 'Juni', 'Juli', 'August', 'September', 'Oktober', 'November', 'Desember'];

//Oppretter et nytt dato-objekt, og metoder som henter dato, måned og år
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
selectedDate.setHours(hour, minute);
setTime();

//Legger til måned og år i mthElement
mthElement.textContent = months[month] + ' ' + year;

//Legger til valgt dato til selectedDateElement-div og dataset.value leser verdien
selectedDateElement.textContent = formatDate(date);
//selectedDateElement.dataset.value = selectedDate;


//Fyller datoer i kaledeneren
populateDates();

//Event listeners som trigger funksjoner ved klikk
datepickerElement.addEventListener('click', toggleDatePicker);
nextMthElement.addEventListener('click', goToNextMonth);
prevMthElement.addEventListener('click', goToPrevMonth);

//
function toggleDatePicker (e) {
	if (!checkEventPathForClass(e.path, 'dates')) {
		datesElement.classList.toggle('active');
	}
}

//Øker "månedstall" og årstall når funksjonen trigges 
function goToNextMonth (e) {
    month++;
	if (month > 11) {
		month = 0;
		year++;
    }
	mthElement.textContent = months[month] + ' ' + year;
    populateDates();
    datesElement.classList.toggle('active');
}

//Minsker "månedstall" og årstall når funksjonen trigges 
function goToPrevMonth (e) {
	month--;
	if (month < 0) {
		month = 11;
		year--;
	}
	mthElement.textContent = months[month] + ' ' + year;
    populateDates();
    datesElement.classList.toggle('active');
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

//Lager div'er med datoer utifra antall dager i måneden og legger inn i daysElement
	for (let i = 0; i < amountDays; i++) {
		const dayElement = document.createElement('div');
		dayElement.classList.add('day');
		dayElement.textContent = i + 1;

		if (selectedDay == (i + 1) && selectedYear == year && selectedMonth == month) {
			dayElement.classList.add('selected');
		}

		dayElement.addEventListener('click', function () {
			selectedDate = new Date(year + '-' + (month + 1) + '-' + (i + 1));
			selectedDay = (i + 1);
			selectedMonth = month;
			selectedYear = year;

			selectedDateElement.textContent = formatDate(selectedDate);
			selectedDateElement.dataset.value = selectedDate;

			populateDates();
		});

		daysElement.appendChild(dayElement);
	}
}

// HELPER FUNCTIONS
function checkEventPathForClass (path, selector) {
	for (let i = 0; i < path.length; i++) {
		if (path[i].classList && path[i].classList.contains(selector)) {
			return true;
		}
	}
	
	return false;
}


function formatDate (d) {
	let day = d.getDate();
	if (day < 10) {
		day = '0' + day;
	}

	let year = d.getFullYear();

	return day + ' . ' + months[month].toLowerCase() + ' ' + year + " // " + time ;
}





//let time = timepickerElement.dataset.time;
/*let hour = date.getHours();
let minute = date.getMinutes();
selectedDate.setHours(hour, minute);
setTime();*/

// EVENT LISTENERS
hrUpElement.addEventListener('click', hour_up);
hrDownElement.addEventListener('click', hour_down);

minUpElement.addEventListener('click', minute_up);
minDownElement.addEventListener('click', minute_down);

hrElement.addEventListener('change', hour_change);
minElement.addEventListener('change', minute_change);

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
}

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
}

function hour_up () {
	hour++;
	if (hour > 23) {
		hour = 0;
	}
	setTime();
}
function hour_down () {
	hour--;
	if (hour < 0) {
		hour = 23;
	}
	setTime();
}

function minute_up () {
	minute++;
	if (minute > 59) {
		minute = 0;
		hour++;
	}
    setTime();
    
}
function minute_down () {
	minute--;
	if (minute < 0) {
		minute = 59;
		hour--;
	}
	setTime();
}

function setTime () {
	hrElement.value = formatTime(hour);
	minElement.value = formatTime(minute);
    timepickerElement.dataset.time = formatTime(hour) + ':' + formatTime(minute);
    time = formatTime(hour) + ':' + formatTime(minute);
    selectedDate.setHours(hrElement.value, minElement.value);
    //return day + ' . ' + months[month].toLowerCase() + ' ' + year + " // " + time ;
    
}

function formatTime (time) {
	if (time < 10) {
		time = '0' + time;
	}
	return time;
}

