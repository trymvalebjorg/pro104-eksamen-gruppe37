////////////////////////////////////////////////////////////////////////////////////////
//Selects key from Local Storage, or creates an array.
let memberList = JSON.parse(localStorage.getItem("memberList")) || [];
let taskList = JSON.parse(localStorage.getItem("taskList")) || [];
let assignedList = JSON.parse(window.localStorage.getItem("assignedList")) || [];

//Selects HTML-elements.
let dropdownMenu = document.querySelector("[name='dropdown-menu']");
let defaultValue = document.querySelector("select option").value;
let memberOutput = document.getElementById("member-output");
let taskOutput = document.getElementById("task-output");

//Adds team members to dropdown menu and memberOutput when site is refreshed/opened.  
for (let i = 0; i < memberList.length; i++) {
    const optionTag = document.createElement("option");
    optionTag.innerHTML = memberList[i];
    dropdownMenu.appendChild(optionTag);
    const newElement = document.createElement("div");
    newElement.innerHTML = `<li>${memberList[i]}</li>`;
    memberOutput.appendChild(newElement);
}

//Adds assigned tasks to taskOutput when site is refreshed/opened.
for (let i = 0; i < assignedList.length; i++) {
    const newElement = document.createElement("div");
    newElement.innerHTML = `
        <h2>${assignedList[i].task}</h2>
        <p>${assignedList[i].member}</p>
    `;
    taskOutput.appendChild(newElement);
}

////////////////////////////////////////////////////////////////////////////////////////
// TASKS

//Adds tasks to taskOutput when "Add"-button is clicked.
function addNewTask(event) {

    //Selects user input from dropdown menu and taskInput-field.
    let taskInput = document.querySelector("[name='task-input']").value;
    let memberInput = document.querySelector("[name='dropdown-menu']").value;
    let defaultValue = document.querySelector("select option").value;

    //If taskInput-field and dropdown menu has no input it will alert.
    if (!taskInput || defaultValue === memberInput) {

        alert("You must add a task AND team member to assign task!");

    } else {

        //Prevents URL from being updated.
        event.preventDefault();

        //Creates objects containing user input. 
        let assignedTask = { member: memberInput, task: taskInput };

        //Adds input to assignedList- and taskList-array.
        assignedList.push(assignedTask);
        taskList.push(taskInput);

        //Saves assignedList- and taskList-array in Local Storage as a string. 
        window.localStorage.setItem("assignedList", JSON.stringify(assignedList));
        window.localStorage.setItem("taskList", JSON.stringify(taskList));

        //Creates <div>-tag and <li>-tags containing user input, and outputs it. 
        const newElement = document.createElement("div");
        newElement.innerHTML = `
            <h2>${taskInput}</h2>
            <p>${memberInput} </p>
        `;
        taskOutput.appendChild(newElement);

        //Empties field when "Add"-button is clicked.
        event.target.reset();
    }
}

////////////////////////////////////////////////////////////////////////////////////////
//TEAM MEMBER

//Adds team members to memberOutput when "Add"-button is clicked.
function addNewTeamMember(event) {

    //Selects user input from memberInput-field.
    let memberInput = document.querySelector("[name='member-input']").value;

    //If memberInput-field has no input it will alert.
    if (!memberInput) {
        alert("You must write a name to add a team member!");
    } else {

        //Prevents URL from being updated.
        event.preventDefault();

        //Adds input from user in memberList-array and saves it in Local Storage as string. 
        memberList.push(memberInput);
        window.localStorage.setItem("memberList", JSON.stringify(memberList));

        //Creates <div>-tag and <li>-tag containing user input, and outputs it. 
        const newElement = document.createElement("div");
        newElement.innerHTML = `<li>${memberInput}</li>`;
        memberOutput.appendChild(newElement);

        //Creates <option>-tag containing user input and outputs to dropdown menu.
        const optionTag = document.createElement("option");
        optionTag.innerHTML = memberInput;
        dropdownMenu.appendChild(optionTag);

        //Empties field when "Add"-button is clicked.
        event.target.reset();
    }
}