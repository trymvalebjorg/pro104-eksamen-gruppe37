
// ReadMore for task
let toggler = document.getElementsByClassName("list__item__expand");
for( i = 0; i < toggler.length; i++){
    toggler[i].addEventListener('click', function() {
        this.parentElement.querySelector('.list__item__expanded').classList.toggle('active');
        this.parentElement.querySelector('.list__item__expanded__controls').classList.toggle('active');
        this.classList.toggle('arrow-down');
    })
}

<<<<<<< HEAD
=======


// ---------------- ADDING NEW TASK ---------------------------------
//Everything is stored within an array in localStorage, so to access the data we have to use loops and indexes.

// Retrieving INPUT values from user.
const listItemInput = document.querySelector('.list__item__input');
const listItemButton = document.querySelector('.list__item__submit');

//Selects the key from localstorage
const taskList = JSON.parse(localStorage.getItem("taskList")) || [];

 //This function needs to put the values into local storage. 
function addNewTask(event){
    event.preventDefault();
   
    //This is the input fields value
    const taskInput = listItemInput.value;
    //Object which contains the key 'task' and the value of the user input
    const taskObj = [{"task": taskInput}];
    //pushing the object into localStorage array
    taskList.push({taskInput});
    //Sets the value in the input-field into localStorage
    window.localStorage.setItem("taskList", JSON.stringify(taskList));
    
}

//When clicking the button, we add a new task to localStorage.
listItemButton.onclick = addNewTask; 

//This function is responsible for showing the tasks listed in localStorage
function showTasks(){
    //Retrieving the output-div from the HTML
    const outputDiv = document.querySelector('#output__div');

    //Looping through the taskList array which contains the input from user.
    for(let i = 0; i < taskList.length; i++){
        //Creating a new List item as a div
        const listItem = document.createElement('div');
        //Assigning attributes to the newly created div to access some of the CSS styling.
        listItem.setAttribute('class', 'list__item');

        //Outputting the HTML into our newly created div
        //Maybe this can be more dynamic????
        listItem.innerHTML += `
            <figure class="list__item__importance dot dot--green"></figure>
            <div class="list__item__text">
                <p class="list__item__text--date">16.05.2020</p>
                <p class="list__item__text--task">${taskList[i]}</p>
            </div>

            <div class="list__item__expand">
                <img src="img/icons/chevron-down-o.svg" alt="read more" class="icon">
            </div>

            <div class="list__item__expanded">
                <p>lorem</p>
            </div> 
         
        `;
        //Appending the listItem div to the outputDiv
        outputDiv.appendChild(listItem);
    }
    
}

//just keeping all the running functions in one place.
function main(){
    showTasks();
}

// ---------------- MAIN FUNCTIONS -------------------------
main();


>>>>>>> a6576e156d0dbd28e2dd7f8514383448b160e181
