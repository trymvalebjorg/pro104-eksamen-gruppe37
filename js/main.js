// ReadMore for task


let toggler = document.getElementsByClassName("list__item__expand");
for( i = 0; i < toggler.length; i++){
    toggler[i].addEventListener('click', function() {
        this.parentElement.querySelector('.list__item__expanded').classList.toggle('active');
        this.parentElement.querySelector('.list__item__expanded__controls').classList.toggle('active');
        this.classList.toggle('arrow-down');
    })
}

function addImportanceMenu(){
    let selectedDot = this.document.querySelector('.dot');
        selectedDot.innerHTML = `
            <div class="list__item__importance__menu">
                <h5 class="list__item__importance__menu__header">Velg prioritering</h5>
                <figure class="list__item__importance__menu__dot dot--green not-important" onclick="changeImportance()"></figure>
                <p class="list__item__importance__menu__priority not-important" onclick="changeImportance()">Ikke viktig</p>
                <figure class="list__item__importance__menu__dot dot--yellow important"></figure>
                <p class="list__item__importance__menu__priority important">Ganske viktig</p>
                <figure class="list__item__importance__menu__dot dot--red very-important"></figure>
                <p class="list__item__importance__menu__priority very-important">Veldig viktig</p>
            </div>
        `;
    
    let importanceMenuElements = document.querySelector('.list__item__importance__menu');
    importanceMenuElements.classList.add('active');
   
}

function changeImportance(){
    console.log('ChangeImportance function triggered');
}
