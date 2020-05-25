let selectedDot = document.querySelectorAll('.dot');

for(var i = 0; selectedDot.length > i; i++){
    selectedDot[i].addEventListener('click', function(){
        console.log("Hei");
    });
}