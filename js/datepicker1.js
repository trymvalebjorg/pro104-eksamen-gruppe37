const months = ['Januar', 'Februar', 'Mars', 'April', 'Mai', 'Juni', 'Juli', 'August', 'September', 'Oktober', 'November', 'Desember'];

let date = new Date();
let month = date.getMonth();
let day = date.getDate();
let year = date.getFullYear();
let selectedDate = date;
let selectedDay = day;
let selectedMonth = month;
let selectedYear = year;

let currentDate1;
let currentMonth;
let currentYear;
let currentDay;
let currentHour;
let currentMinute;
let currentTime;

let datepickerOutputElement = document.querySelectorAll('.list__item__text--date');
let selectedDueDate = document.querySelectorAll('.duedate__selected');
let overlayElement = document.querySelector('.overlay');

let clickedDuedate;
let clickedCalendar;
let clickedDays;
let clickedDay;
let clickedMonth;
let clickedCalendarHr;
let clickedCalendarMin;

let hour = date.getHours();
let minute = date.getMinutes();
let time = hour + ":" + minute;

//Oppdaterer tid hvert sekund
function updateTime(){
    currentDate1 = new Date();
    currentMonth = currentDate1.getMonth();
    currentYear = currentDate1.getFullYear();
    currentDay = currentDate1.getDate();
    currentHour = currentDate1.getHours();
    currentMinute = currentDate1.getMinutes();
    currentTime = currentHour + ":" + currentMinute;
    //console.log(currentDate1);
}
setInterval(updateTime, 1000);

//Legger tekst inn i datepickerOutputElement
for(var i=0; datepickerOutputElement.length > i; i++){
    datepickerOutputElement[i].innerHTML="Ingen forfallsdato";
}

//Trigger funksjonen addDueDateHTML dersom et datepickerOutputElement klikkes på
for(var i=0; datepickerOutputElement.length > i; i++){
     datepickerOutputElement[i].addEventListener('click', addDueDateHTML);
}

//Funksjon som legger til forfallsdato
function addDueDateHTML(){
    
    //Dersom teksten i datepickerOutputElement er "Ingen forfallsdato" legges HTML til
    if(event.target.innerHTML === "Ingen forfallsdato"){
    event.target.innerHTML= `
        <div class="duedate__selected"></div>
        <div class="duedate__picker active">
            <div class="duedate__picker__calendar">
                <div class="duedate__picker__calendar__month">
                    <img src="img/icons/arrow.svg" alt="arrow" class="duedate__picker__calendar__month__prevmth arrows">
                    <div class="duedate__picker__calendar__month__mth"></div>
                    <img src="img/icons/arrow.svg" alt="arrow" class="duedate__picker__calendar__month__nextmth arrows">
                </div>
                <div class="duedate__picker__calendar__days"></div>
            </div>
            <div class="duedate__picker__time" data-time="00:00">
                <div class="duedate__picker__time__hour">
                    <img src="img/icons/arrow.svg" alt="arrow" class="duedate__picker__time__hour__hr-up arrows">
                    <input type="number" class="duedate__picker__time__hour__hr" value="00" />
                    <img src="img/icons/arrow.svg" alt="arrow" class="duedate__picker__time__hour__hr-down arrows">
                </div>
                <div class="duedate__picker__time__separator">:</div>
                <div class="duedate__picker__time__minute">
                    <img src="img/icons/arrow.svg" alt="arrow" class="duedate__picker__time__minute__min-up arrows">
                    <input type="number" class="duedate__picker__time__minute__min" value="00">
                    <img src="img/icons/arrow.svg" alt="arrow" class="duedate__picker__time__minute__min-down arrows">
                </div>
            </div>
            <div class="duedate__reminder">
                <img src="img/icons/bell.svg" class="duedate__reminder__bell">
                <label for="reminder">
                <select name="reminder" class="duedate__reminder--menu">
                    <option value="default" class="duedate__reminder--menu__default" selected disabled>Legg til påminnelse</option>
                    <option value="1min">1 minutt før</option>
                    <option value="5min">5 minutter før</option>
                    <option value="15min">15 minutter før</option>
                    <option value="30min">30 minutter før</option>
                    <option value="1hr">1 time før</option>
                    <option value="2hr">2 timer før</option>
                    <option value="1day">1 dag før</option>
                    <option value="remove">Ingen varsel</option>
                </select>
            </label>
            </div>
        </div>
        
        <div class="reminder-popup">
        <h2 class="reminder-popup__header">Påminnelse</h1>
        <img src="img/icons/bell.svg" class="reminder-popup__bell">
        <div class="reminder-popup__text"><u>Møt gruppe på Discord</u> på listen <u>Må gjøres</u> forfaller om 5 minutter.</div>
        <img src="img/icons/check-o.svg" class="reminder-popup__button" onclick="showReminderPopUp()">
        </div>
        `;
    
        
    clickedDuedate = event.target.children[0];
    clickedCalendar = event.target.children[1];
    clickedDays = event.target.children[1].children[0].children[1];
    clickedMonth = event.target.children[1].children[0].children[0].children[1];
    clickedCalendarHr = event.target.children[1].children[1].children[0].children[1];
    clickedCalendarMin = event.target.children[1].children[1].children[2].children[1];
    
    //Legger til nåværende dag, måned, år og tid til elementet som ble klikket på
    clickedDuedate.innerHTML = currentDay + ' . ' + months[currentMonth].toLowerCase() + ' ' + currentYear + " // " + currentTime ;

    let nextMthElement = event.target.children[1].children[0].children[0].children[2];
    let prevMthElement = event.target.children[1].children[0].children[0].children[0];
    let hrUpElement = event.target.children[1].children[1].children[0].children[0];
    let hrDownElement = event.target.children[1].children[1].children[0].children[2];
    let minUpElement = event.target.children[1].children[1].children[2].children[0];
    let minDownElement = event.target.children[1].children[1].children[2].children[2];
    let reminderInput = event.target.children[1].children[2].children[1].children[0];
    
    //Eventlistners
    reminderInput.addEventListener('change', chooseReminderTime);
    nextMthElement.addEventListener('click', goToNextMonth);
    prevMthElement.addEventListener('click', goToPrevMonth);
    hrUpElement.addEventListener('click', hour_up);
    hrDownElement.addEventListener('click', hour_down);
    minUpElement.addEventListener('click', minute_up);
    minDownElement.addEventListener('click', minute_down);
    overlayElement.addEventListener('click', function(){
        if (overlayElement.classList.contains("active") ){
            clickedCalendar.classList.remove('active');
            overlayElement.classList.remove("active");
        }
        }   
    );
    
    //Legger overlay bak forfallsdato-velgeren
    overlayElement.classList.add("active");

    //Fyller dager, måneder og tid i forfallsdato-velgeren
    fillDaysInCal(clickedDays);
    fillMonthInCal(clickedMonth);
    fillTimeInCal();
    }
}

//Legger til klasse "active" til forfallsdato-velgeren og overlay-elementet dersom det klikkes på
for(var i=0; datepickerOutputElement.length > i; i++){
    datepickerOutputElement[i].addEventListener('click', function(){
        let currentCalendar = this.children[1];
        currentCalendar.classList.add('active');
        overlayElement.classList.add('active');
    });
}

//Fyller dager i kalenderen
function fillDaysInCal(days){
    days.innerHTML = "";
    const amountDaysInMonth = [31,28,30,29];

    //Justerer antall dager som skal vises i kalenderen utifra hvilken måned og hvilket år(skuddår)
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

    //Lager div'er utifra dager i måneden med datoen inni
    for (let i = 0; i < amountDays; i++) {
		const dayElement = document.createElement('div');
		dayElement.classList.add('day');
        dayElement.textContent = i + 1;
        days.appendChild(dayElement);

        //Legger til klassen "selected" til div'en som inneholder nåværende dato
        if (selectedDay == (i + 1) && selectedYear == year && selectedMonth == month) {
            days.children[i].classList.add('selected');
        }

        /*days.children[i].addEventListener('click', function(){
            clickedDay = event.target;
            
            //newDate = new Date(year + '-' + (month + 1) + '-' + (i + 1));
            newDate = new Date();
			newDay = (i + 1);
			newMonth = newDate.getMonth();
            newYear = newDate.getFullYear();
            newTime = newDate.setHours(newDate.getHours(), newDate.getMinutes());

            fillDaysInCal(days);
            clickedDuedate.innerHTML = clickedDay + ' . ' + months[newMonth].toLowerCase() + ' ' + newTime + " // " + formatTime(newDate.getHours()) + ':' + formatTime(newDate.getMinutes());
        */

        //Trigger funksjon dersom en av datoene klikkes på i kalenderen
        days.children[i].addEventListener('click', function(){
            
            selectedDate = new Date();
			selectedDay = (i + 1);
			selectedMonth = month;
            selectedYear = year;
            selectedTime = selectedDate.setHours(hour, minute);

            //Trenger for å oppdatere selected day, men burde finne annen løsning..?
            fillDaysInCal(days);

            //Oppdaterer forfallsdatoene hver gang en ny dato trykkes på
            clickedDuedate.innerHTML = selectedDay + ' . ' + months[selectedMonth].toLowerCase() + ' ' + selectedYear + " // " + formatTime(hour) + ':' + formatTime(minute);
        });
        }
}


//Ender teksten til riktig måned og år
function fillMonthInCal(monthEl){
    monthEl.textContent = months[month] + ' ' + year;
}


//Legger til timer i kalenderen
function fillTimeInCal(){
    clickedCalendarHr.value = formatTime(hour);
    clickedCalendarMin.value = formatTime(minute);
    selectedDate.setHours(clickedCalendarHr.value, clickedCalendarMin.value, 0);
    clickedDuedate.innerHTML = selectedDay + ' . ' + months[selectedMonth].toLowerCase() + ' ' + selectedYear + " // " + formatTime(hour) + ':' + formatTime(minute);
}

//Legger til 0 foran tiden dersom timene eller minuttene er under 10
function formatTime (time) {
	if (time < 10) {
		time = '0' + time;
	}
	return time;
}

//Øker timen med 1, frem til 23 - starter på 0 igjen
function hour_up () {
	hour++;
	if (hour > 23) {
		hour = 0;
	}
	fillTimeInCal();
}

//Minsker timen med 1, frem til 0 - starter på 23 igjen
function hour_down () {
	hour--;
	if (hour < 0) {
		hour = 23;
	}
	fillTimeInCal();
}

//Øker minutter med 1, frem til 59 - starter på 0 igjen og legger til 1 time
function minute_up () {
	minute++;
	if (minute > 59) {
		minute = 0;
		hour++;
	}
    fillTimeInCal();
}

//Minsker minutter med 1, frem til 0 - starter på 59 igjen og trekker fra 1 time
function minute_down () {
	minute--;
	if (minute < 0) {
		minute = 59;
		hour--;
	}
	fillTimeInCal();
}

//Øker måneden med 1, frem til 11 - starter på 0 igjen og legger til 1 år
function goToNextMonth () {
    month++;
	if (month > 11) {
		month = 0;
		year++;
    }

    clickedMonth.textContent = months[month] + ' ' + year;
    fillMonthInCal(clickedMonth);
    fillDaysInCal(clickedDays);
}

//Minsker måneden med 1, frem til 0 - starter på 11 igjen og trekker fra 1 år
function goToPrevMonth () {
    month--;
	if (month < 0) {
		month = 11;
		year--;
    }

    clickedMonth.textContent = months[month] + ' ' + year;
    fillMonthInCal(clickedMonth);
    fillDaysInCal(clickedDays);
}

//Funksjon som trigges dersom påminnelse menyen oppdager endring
function chooseReminderTime(){
    let reminderDefaultValue = document.querySelector(".duedate__reminder--menu__default");
    let currentDate = new Date();

    //Trigger nedtelling før funksjonen showReminderPopUp-funksjonen skal trigges
	switch (this.value){
		case "1min":
			const minInMs = 60000;
            window.setTimeout(showReminderPopUp, (selectedDate - currentDate - minInMs), event.target);
            
			break;
		case "5min":
			const fiveMinInMs = 300000;
			window.setTimeout(showReminderPopUp, (selectedDate - currentDate - fiveMinInMs), event.target);
			break;

		case "15min":
			const fifteenMinInMs = 900000;
			window.setTimeout(showReminderPopUp, (selectedDate - currentDate - fifteenMinInMs), event.target);
			break;

		case "30min":
			const thirtyMinInMs = 1800000;
			window.setTimeout(showReminderPopUp, (selectedDate - currentDate - thirtyMinInMs), event.target);
			break;

		case "1hr":
			const oneHourInMs = 3600000;
			window.setTimeout(showReminderPopUp, (selectedDate - currentDate - oneHourInMs), event.target);
			break;
		
		case "2hr":
			const twoHoursInMs = 7200000;
			window.setTimeout(showReminderPopUp, (selectedDate - currentDate - twoHoursInMs), event.target);
			break;

		case "1day":
			const oneDayInMs = 86400000;
			window.setTimeout(showReminderPopUp, (selectedDate - currentDate - oneDayInMs), event.target);
			break;

		case "remove":
				reminderDefaultValue.selected = true;
			break;
	}
}

//Legger til klassen "active" til påminnelses popup'en
function showReminderPopUp(e){
    let wholeList = e.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement;
    let listHeader = wholeList.children[0].children[1].innerText;
    let reminderPop = e.parentElement.parentElement.parentElement.parentElement.children[2];
    let reminderCloseButton = reminderPop.children[3];
    let task = e.parentElement.parentElement.parentElement.parentElement.parentElement.children[1].innerText;

    reminderPop.classList.add('active');

    let timeLeft;
    switch (e.value){
		case "1min":
            timeLeft = "1 minutt";
			break;
		case "5min":
			timeLeft = "5 minutter";
			break;
		case "15min":
			timeLeft = "15 minutter";
			break;
		case "30min":
			timeLeft = "30 minutter";
			break;
		case "1hr":
			timeLeft = "1 time";
			break;
		case "2hr":
			timeLeft = "2 timer";
			break;
		case "1day":
			timeLeft = "1 dag";
			break;
	}

    reminderPop.children[2].innerHTML=`
    <u>${task}</u> på listen <u>${listHeader}</u> forfaller om ${timeLeft}.
    `;

	overlayElement.classList.add('active');

	reminderCloseButton.onclick = function(){
		reminderPop.classList.remove('active');
	};
}


