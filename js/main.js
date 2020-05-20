
// ReadMore for task
let toggler = document.getElementsByClassName("list__item__expand");
for( i = 0; i < toggler.length; i++){
    toggler[i].addEventListener('click', function() {
        this.parentElement.querySelector('.list__item__expanded').classList.toggle('active');
        this.parentElement.querySelector('.list__item__expanded__controls').classList.toggle('active');
        this.classList.toggle('arrow-down');
    })
}


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
 
    
    //pushing the object into localStorage array
    taskList.push({taskInput});
    //Sets the value in the input-field into localStorage
    window.localStorage.setItem("taskList", JSON.stringify(taskList));
    
}


//This function is responsible for showing the tasks listed in localStorage
function showTasks(){
    //Retrieving the output-div from the HTML
    const outputDiv = document.querySelector('#output__div');

    //Looping through the taskList array which contains the input from user.
    for(let i = 0; i < taskList.length; i++){
        const listDiv = document.querySelector('.list');
        //Creating a new List item as a div
        const listItem = document.createElement('div');
        //Assigning attributes to the newly created div to access some of the CSS styling.
        listItem.setAttribute("class", "list__item");

        //Outputting the HTML into our newly created div
        //Maybe this can be more dynamic????
        listDiv.innerHTML += `
            <div class="list__item">
            <figure class="list__item__importance dot dot--green"></figure>
            <div class="list__item__text">
                <p class="list__item__text--date">16.05.2020</p>
                <p class="list__item__text--task">${JSON.stringify(taskList[i].taskInput)}</p>
            </div>

            <div class="list__item__expand">
                <img src="img/icons/chevron-down-o.svg" alt="read more" class="icon">
            </div>

            <div class="list__item__expanded">
                <p>lorem</p>
            </div> 
            </div>
            `;
        //Appending the listItem div to the outputDiv
        outputDiv.appendChild(listItem);
    }
    
}

// --------------------- ADDING NEW MEMBER -----------------

//Selects the key from localStorage
const memberList = JSON.parse(localStorage.getItem("memberList")) || [];
//Gets the input field.
const memberInput = document.getElementById("member__input");
//Submit button
const memberInputBtn = document.getElementById("member__input__btn");
//Member object, stored in local storage
const memberObj = {
    'name': memberInput
}

//FUNCTION for adding member
function addMember(event){
    event.preventDefault();
    const memberName = memberInput.value;
    //If the input field is empty, display an alert
    if(!memberInput){
        alert("You must input a name.");
    } else {
        //Adding the object to the memberList
        memberList.push({memberName});
        //Setting the item to localStorage
        localStorage.setItem("memberList", JSON.stringify(memberList));
        
    }

}

// ---- ON CLICKS -----------
//When clicking the button, we add a new task to localStorage.
listItemButton.onclick = addNewTask; 
//When clicking the button, we add a new member to localStorage.
memberInputBtn.onclick = addMember;

//Just a dummy for outputting the values, THIS HAS TO BE CHANGED
const test = document.getElementById("test");

//Function that loops through local storage and outputs the value into a P-tag(change this later)
function showMembers(){
    for(let i = 0; i < memberList.length; i++){
        test.innerHTML += `${JSON.stringify(memberList[i].memberName)}, `;
    }
}



//just keeping all the running functions in one place.
function main(){
    showTasks();
    showMembers();
}

// ---------------- MAIN FUNCTIONS -------------------------
main();