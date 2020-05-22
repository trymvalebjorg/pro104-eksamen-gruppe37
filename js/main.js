// ReadMore for task


let toggler = document.getElementsByClassName("list__item__expand");
for( i = 0; i < toggler.length; i++){
    toggler[i].addEventListener('click', function() {
        this.parentElement.querySelector('.list__item__expanded').classList.toggle('active');
        this.parentElement.querySelector('.list__item__expanded__controls').classList.toggle('active');
        this.classList.toggle('arrow-down');
    })
}
let importanceDotElements = document.querySelectorAll(".dot");
importanceDotElements.addEventListener('click', myFunction);

function myFunction(){
    e.target.console.log("Dot has been clicked");
}
