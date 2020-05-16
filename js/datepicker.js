//Henter alle nødvendige HTML-elementer 
const datepickerElement = document.querySelector('.datepicker');
const selectedDateElement = document.querySelector('.datepicker .datepicker__dateselected');
const datesElement = document.querySelector('.datepicker .datepicker__dates');
const mthElement = document.querySelector('.datepicker .datepicker__dates .datepicker__dates__month .datepicker__dates__month__mth');
const nextMthElement = document.querySelector('.datepicker .datepicker__dates .datepicker__dates__month .datepicker__dates__month__nextmth');
const prevMthElement = document.querySelector('.datepicker .datepicker__dates .datepicker__dates__month .datepicker__dates__month__prevmth');
const daysElement = document.querySelector('.datepicker .datepicker__dates .datepicker__dates__days');

//Alle måneder
const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

//Dato metoder
let date = new Date();
let day = date.getDate();
let month = date.getMonth();
let year = date.getFullYear();


let selectedDate = date;
let selectedDay = day;
let selectedMonth = month;
let selectedYear = year;

//Valgt dato
mthElement.textContent = months[month] + ' ' + year;

selectedDateElement.textContent = formatDate(date);
selectedDateElement.dataset.value = selectedDate;

populateDates();

// EVENT LISTENERS
datepickerElement.addEventListener('click', toggleDatePicker);
nextMthElement.addEventListener('click', goToNextMonth);
prevMthElement.addEventListener('click', goToPrevMonth);

// FUNCTIONS
function toggleDatePicker (e) {
	if (!checkEventPathForClass(e.path, 'dates')) {
		datesElement.classList.toggle('active');
	}
}

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

function leapyear(year) {
    return year % 100 === 0 ? year % 400 === 0 : year % 4 === 0;
}

var leapYear = (year % 4 == 0) && (year % 100 != 0) || (year % 400 == 0);
//Fyller inn dato i 
function populateDates (e) {
    daysElement.innerHTML = '';
    var leapYear = (year % 4 == 0) && (year % 100 != 0) || (year % 400 == 0);
    let amount_days = [31,28,30,29];

    if (month == 1){
        amount_days = amount_days[1];
    } else if ( month == 3 || month == 5 || month ==  8 || month ==  10 ) {
        amount_days = amount_days[2];
    } else if ((month == 1) && leapYear) {
        amount_days = amount_days[3];
    } else {
        amount_days = amount_days[0];
    }


	for (let i = 0; i < amount_days; i++) {
		const day_element = document.createElement('div');
		day_element.classList.add('day');
		day_element.textContent = i + 1;

		if (selectedDay == (i + 1) && selectedYear == year && selectedMonth == month) {
			day_element.classList.add('selected');
		}

		day_element.addEventListener('click', function () {
			selectedDate = new Date(year + '-' + (month + 1) + '-' + (i + 1));
			selectedDay = (i + 1);
			selectedMonth = month;
			selectedYear = year;

			selectedDateElement.textContent = formatDate(selectedDate);
			selectedDateElement.dataset.value = selectedDate;

			populateDates();
		});

		daysElement.appendChild(day_element);
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

    let month = d.getMonth() + 1;
    
	if (month < 10) {
		month = '0' + month;
	}

	let year = d.getFullYear();

	return day + ' / ' + month + ' / ' + year;
}