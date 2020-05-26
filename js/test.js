// Henter alle "dotter".
let selectedDot = document.querySelectorAll('.dot');

// Legger til event listener til alle "dottene". Funksjonen addImportanceMenu trigges ved klikk på disse. 
for(var i = 0; selectedDot.length > i; i++){
    selectedDot[i].addEventListener('click', addImportanceMenu);
}

// Legger til en popup meny
function addImportanceMenu(){
    let importanceMenuElements = document.getElementsByClassName('list__item__importance__menu');
    
    //Dersom det ikke er en meny fra før av legges HTML til menyen
    if (importanceMenuElements.length === 0){
        event.target.innerHTML = `
        <div class="list__item__importance__menu active">
            <h5 class="list__item__importance__menu__header">Velg prioritering</h5>
            <figure class="list__item__importance__menu__dot dot--green not-important"></figure>
            <p class="list__item__importance__menu__priority not-important">Ikke viktig</p>
            <figure class="list__item__importance__menu__dot dot--yellow important"></figure>
            <p class="list__item__importance__menu__priority important" onclick=>Ganske viktig</p>
            <figure class="list__item__importance__menu__dot dot--red very-important"></figure>
            <p class="list__item__importance__menu__priority very-important">Veldig viktig</p>
        </div>
    `;
    
    let notImportant = document.getElementsByClassName('not-important');
    let veryImportant = document.getElementsByClassName('very-important');
    let important = document.getElementsByClassName('important');
    
    //Event listners for de ulike alternativene som trigger funksjon ved klikk
    for( i = 0; i < notImportant.length; i++){
        notImportant[i].addEventListener('click', changeImportance);
    }

    for( i = 0; i < veryImportant.length; i++){
        veryImportant[i].addEventListener('click', changeImportance);
    }

    for( i = 0; i < important.length; i++){
        important[i].addEventListener('click', changeImportance);
    }
    }
}

//Endrer fargen til valgt "dott"
function changeImportance(){
        let selectedImportance = event.target;
        let selectedImportanceClass = event.target.classList[1];
        let selectedDot = selectedImportance.parentElement.parentElement;
        let selectedDotClass = selectedDot.classList[2];

        selectedDot.classList.remove(selectedDotClass);

        if (selectedImportanceClass  === "dot--green" || selectedImportanceClass  === "not-important"){
            selectedDot.classList.add('dot--green');
            selectedImportance.parentElement.remove('active')
            
        } else if (selectedImportanceClass === "dot--yellow" || selectedImportanceClass  === "important"){
            selectedDot.classList.add('dot--yellow');
            selectedImportance.parentElement.remove('active')

        } else {
            selectedDot.classList.add('dot--red');
            selectedImportance.parentElement.remove('active')
        }
}

//Ikke ferdig
function addImportance(importance) {
    let storage = JSON.parse(localStorage.getItem("tasks")) || [];
    storage.push({importance: importance })
    localStorage.setItem("tasks", JSON.stringify(storage))
}
