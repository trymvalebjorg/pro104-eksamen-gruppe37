// //Denne funksjonen sjekker om formen sin display er "display:none",
// function showTaskForm(formDiv) {
//     //Hvis displayet er skjult, så sett verdien av displayet til block
//     if (formDiv.style.display == "") {
//         formDiv.style.display = "block";
//         //Hvis displayet er synlig, gjør det det til display none igjen
//     } else {
//         formDiv.style.display = "";
//     }
// }

//Ikke ferdig
function assignTask(event) {
    event.preventDefault();

    //Lager en assignedList i localStorage
    let assignedList = JSON.parse(localStorage.getItem("assignedList")) || [];
    //Henter HTML input fieldene
    let taskValue = document.getElementById("assign__member__form--task");
    let memberValue = document.getElementById("assign__member__form--member");

    //Definerer en variabel for "riktig oppgave", brukt senere for å linke input fieldet med en oppgave skrevet i en liste.
    let correctTask = document.getElementsByClassName("list__item__text--task");

    //Henter direkte verdier fra input fields
    let taskVal = taskValue.value;
    let memVal = memberValue.value;

    let divInfo = document.createElement('div');
    divInfo.className = "list__item__text";

    let listItem = document.getElementsByClassName("list__item");
    //Looper gjennom alle oppgavene, og sjekker om teksten inni matcher verdien i input fieldet
    for (let i = 0; i < correctTask.length; i++) {
        //Hvis innholdet i listen er likt som verdien i input fieldet
        if (correctTask[i].innerText == taskVal) {
            if(listItem[i].innerHTML.includes(memVal)){
                alert("Already assigned");
            } else {
                assignedList.push({ taskVal, memVal });
                localStorage.setItem("assignedList", JSON.stringify(assignedList));
            }
            //Hvis det stemmer, push verdiene til localstorage arrayet
            //Sett assignedList til localStorage(oversikt over hvem som gjør hva)
            //Hvis den spesifikke div'en i listen har verdien av taskVal, skriv deretter ut diven
        }
    }
}

//Funksjon for å legge til medlemmer
function addMember(event) {
    event.preventDefault();
    //Hente ut input-verdier
    let memberInput = document.getElementById("add__member__form--text");
    //Memberinputet sin verdi (navnet)
    let memberName = memberInput.value;
    //Lager en member liste i local storage
    let memberList = JSON.parse(localStorage.getItem("memberList")) || [];

    //Pusher input-verdien (altså medlemnavn) til localstorage
    memberList.push({ memberName });
    //Resetter valuen
    memberInput.value = "";
    //Setter det i memberList inne i localStorage
    localStorage.setItem("memberList", JSON.stringify(memberList));
    //Kaller på renderMembers funksjonen for å få printet ut navnet
    renderMembers();
}

//Funksjon for å vise medlemmer
function renderMembers() {
    //Henter ut member list fra localstorage
    let memberList = JSON.parse(localStorage.getItem("memberList")) || [];
    //Henter outputdiv for å skrive ut verdien som blir hentet fra localstorage
    let toolbarMemberOutput = document.getElementById("toolbar__members--output");
    toolbarMemberOutput.innerHTML = "Medlemmer: ";
    //Looper gjennom å skriver ut alle member-navn som er lagret i localstorage
    for (let i = 0; i < memberList.length; i++) {
        //Printer det ut
        toolbarMemberOutput.innerHTML += `${memberList[i].memberName}`;
        //Hvis telleren vår er en mindre enn lengden på hele arrayet, legg til et komma for å separere navnene
        if (i < memberList.length - 1) {
            toolbarMemberOutput.innerHTML += ", "
        }
    }
}

function renderOptions() {
    //Henter ut localStorage
    let memberList = JSON.parse(localStorage.getItem("memberList")) || [];
    let taskList = JSON.parse(localStorage.getItem("tasks"));
    //Henter ut select-tagsa
    let assignTaskSelect = document.getElementById("assign__member__form--task");
    let assignMemberSelect = document.getElementById("assign__member__form--member");

    for (let i = 0; i < memberList.length; i++) {
        assignMemberSelect.innerHTML += `
            <option>${memberList[i].memberName}</option>
        `;
    }

    for (let i2 = 0; i2 < taskList.length; i2++) {
        assignTaskSelect.innerHTML += `
            <option>${taskList[i2].task}</option>
        `;
    }
}

//Funksjon for å legge til tasks, tar imot hvilken oppgave og en liste
function addTask(task, date, importance, list) {
    let storage = JSON.parse(localStorage.getItem("tasks")) || [];
    
    //Pusher oppgaven OG hvilken liste
    storage.push({ task: task, date: date, importance: importance, list: list })

    localStorage.setItem("tasks", JSON.stringify(storage))
    //Kaller på render lists funksjonen, som også tar seg av å legge til oppgaver
    renderLists();
}

function changeTaskImportance(taskName, importance) {
    let storage = JSON.parse(localStorage.getItem("tasks"))
    for (let i = 0; i < storage.length; i++) {
        if (storage[i].task == taskName) {
            storage[i].importance = importance;
        }
    }
    localStorage.setItem("tasks", JSON.stringify(storage));
}

function renderTasks(outputDiv, listName) {
    let storage = JSON.parse(localStorage.getItem("tasks")) || [];
    let assignedList = JSON.parse(localStorage.getItem("assignedList")) || [];
    
    for (let task of storage) {

        if (task.list == listName) {
            
            //Hoveddiv
            let newDiv = document.createElement("div");
            newDiv.className = "list__item"

            let importance = document.createElement("figure");
            importance.className = `list__item__importance__menu__dot dot ${task.importance}`;


            importance.onclick = function(){
                let userAnswer = prompt("pick a color, either red, green or yellow");

                let newColor = userAnswer.toUpperCase();
                
                switch(newColor){
                    case "RED":
                        let dotRed = "dot--red";
                        importance.className = `list__item__importance__menu__dot dot ${task.importance}`;
                        changeTaskImportance(task.task, dotRed);
                        location.reload();
                        break;

                    case "YELLOW":
                        let dotYellow = "dot--yellow";
                        importance.className = `list__item__importance__menu__dot dot ${task.importance}`;
                        changeTaskImportance(task.task, dotYellow);
                        location.reload();
                        break;
                        
                    case "GREEN":
                        let dotGreen = "dot--green";
                        importance.className = `list__item__importance__menu__dot dot ${task.importance}`;
                        changeTaskImportance(task.task, dotGreen);
                        location.reload();
                        break;
                } 
            }

            //Task basert info i div
            let divInfo = document.createElement("div");
            divInfo.className = "list__item__text";
            divInfo.innerHTML += `<p class="list__item__text--date">${task.date}</p>`;
            divInfo.innerHTML += `<p class="list__item__text--task">${task.task}</p>`;

            let listItemExpandBtn = document.createElement("div");
            listItemExpandBtn.className = "list__item__expand";
            listItemExpandBtn.innerHTML = '<img src="img/icons/triangle.svg" alt="read more" class="arrow arrow--grey">';

            let listItemExanded = document.createElement("div");
            listItemExanded.className = "list__item__expanded";

            let listItemMembers = document.createElement("div");
            listItemMembers.className = "list__item__expanded__members";
            listItemMembers.innerHTML += 'Assigned to: '

            let listItemExpandedControls = document.createElement("div");
            listItemExpandedControls.className = "list__item__expanded__controls";

            let listItemEditBtn = document.createElement("button");
            listItemEditBtn.className = 'list__item__expanded__btn btn btn--grey btn--round btn--edit';

            let listItemUploadBtn = document.createElement("button");
            listItemUploadBtn.className = 'list__item__expanded__btn btn btn--grey btn--round btn--upload';

            //Her må vi delete
            let listItemDeleteBtn = document.createElement("button");
            listItemDeleteBtn.className = 'list__item__expanded__btn btn btn--red btn--round btn--remove';

            listItemDeleteBtn.onclick = function(event){
                event.preventDefault();
                console.log("clicked");
                let taskStorage = JSON.parse(localStorage.getItem("tasks"));
                for(let i = 0; i < taskStorage.length; i++){
                    if(taskStorage[i].task == task.task){
                        taskStorage.splice(i, 1);
                    }
                }
                localStorage.setItem("tasks", JSON.stringify(taskStorage));
                location.reload();
            }

            //Sjekker om assignlisten har samme task verdi som tasks, og hvis dette er tilfelle skriver den ut hvilket teammedlem som er tildelt oppgaven.
            for (let i = 0; i < assignedList.length; i++) {
                if (assignedList[i].taskVal == task.task) {

                    listItemMembers.innerHTML += `${assignedList[i].memVal}`;

                    if(i < assignedList.length - 1){
                        listItemMembers.innerHTML += `, `;
                    }
                }
            }

            newDiv.appendChild(importance);
            newDiv.appendChild(divInfo);
            newDiv.appendChild(listItemExpandBtn);
            newDiv.appendChild(listItemExpandedControls);
            listItemExpandedControls.appendChild(listItemEditBtn);
            listItemExpandedControls.appendChild(listItemUploadBtn);
            listItemExpandedControls.appendChild(listItemDeleteBtn);
            newDiv.appendChild(listItemExanded);
            listItemExanded.appendChild(listItemMembers);


            //Drag and drop!
            newDiv.setAttribute("draggable", true);
            newDiv.addEventListener("dragover", function (event) {
                event.preventDefault()
            })

            newDiv.addEventListener("drop", function (event) {
                event.preventDefault();
                let taskData = event.dataTransfer.getData("taskName")
                let alleTasks = JSON.parse(localStorage.getItem("tasks"))
                for (let oppgave of alleTasks) {
                    if (oppgave.task == taskData) {
                        oppgave.list = task.list;
                    }
                }
                localStorage.setItem("tasks", JSON.stringify(alleTasks));
                renderLists();
            })

            newDiv.addEventListener("dragstart", function (event) {
                event.dataTransfer.setData("taskName", task.task)
            })
            outputDiv.appendChild(newDiv);
        }
    }
}

//Funksjon for å dynamisk lage nye lister
function createList(event) {
    event.preventDefault();
    //Henter ut lists fra localstorage
    let listStorage = JSON.parse(localStorage.getItem("lists")) || [];

    //Input fra bruker
    let listName = document.getElementById("add__list__form--text");

    //Pusher verdien av listenavnet til localstorage
    listStorage.push(listName.value);
    //Resetter input-verdien
    listName.value = "";
    //Legger det i localStorage
    localStorage.setItem("lists", JSON.stringify(listStorage));
    //Kaller på main funksjonen, som har en onsubmit som lagrer listen
    main();
}

function renderLists() {
    //Henter ut lists fra localstorage
    let listStorage = JSON.parse(localStorage.getItem("lists")) || [];
    let output = document.getElementById("listOutput");
    output.innerHTML = "";
    

    //For hver liste i localstorage, lag nye lister
    for (let list of listStorage) {
        let newDiv = document.createElement("div")
        newDiv.className = "list";
        newDiv.addEventListener("dragover", function(event){
            event.preventDefault();
        })
        newDiv.addEventListener("drop", function(event){
            event.preventDefault();
            
            let taskData = event.dataTransfer.getData("taskName")
            let alleTasks = JSON.parse(localStorage.getItem("tasks"));
            for (let oppgave of alleTasks) {
                if (oppgave.task == taskData) {
                    oppgave.list = list;
                }
            }
            localStorage.setItem("tasks", JSON.stringify(alleTasks));
            renderLists();
        })

        //lager header
        let listHeader = document.createElement("div");
        listHeader.className = "list__header";
        listHeader.innerHTML += '<img src="img/icons/album.svg" alt="an icon" class="icon"></img>'
        listHeader.innerHTML += `<h3>${list}</h3>`;
        newDiv.appendChild(listHeader);
        
        // let listBody = document.createElement('div');
        // listBody.className = 'list__item--empty';
        // listBody.innerHTML = '<p>Trykk på pluss-tegnet for å legge til en oppgave</p>';
        // newDiv.appendChild(listBody);

        //Form for input av ny task, har display="none" som default.
        let inputFormDiv = document.createElement("div");
        inputFormDiv.className = "task__input__form";
        let form = document.createElement("form");
        form.className = "list__item--form";

        let dateInput = document.createElement("input");
        dateInput.type = "button";
        
        flatpickr(dateInput, {
            enableTime: true,
            dateFormat: "d-m-Y H:i",
            time_24hr: true,
            minDate: "today"
        });

        dateInput.className = 'btn--calendar btn'
        form.appendChild(dateInput);

        let taskInput = document.createElement("input")
        taskInput.type = "text";
        taskInput.placeholder = "Legg til en oppgave";
        form.appendChild(taskInput);

        //fargen
        let importance = "dot--green";

        let addTaskButton = document.createElement("button");
        addTaskButton.type = "submit";
        addTaskButton.className = "btn--morph--white btn--add";
        addTaskButton.id = "btn--add-task"; 
        

        //Her kjører vi addTask funksjonen med oppgave og liste som input
        addTaskButton.onclick = function (event) {
            event.preventDefault();
            addTask(taskInput.value, dateInput.value, importance, list);
            //hvorfor fyrer ikke denne?
            inputFormDiv.classList.toggle('none');
        }

        form.appendChild(addTaskButton);
        inputFormDiv.appendChild(form);
        newDiv.appendChild(inputFormDiv);
        
        // //Knapp for å vise input
        // let addTaskButton2 = document.createElement("button");
        // addTaskButton2.onclick = function () {
        // }

        output.appendChild(newDiv);

        //Input av alle tasks som ligger tilknyttet til denne.
        renderTasks(newDiv, list);
    }

    let addListDiv = document.createElement("div");
    addListDiv.className = 'list';
    addListDiv.innerHTML = `
        <form id="add__list__form" onsubmit="saveList(); return false;" class="list__item--add">
            <input id="add__list__form--text" type="text" placeholder="Legg til en ny liste">
            <button id="add__list__form--submit" class="btn--morph--white btn--add" type="submit"></button>
        </form>`;

    output.appendChild(addListDiv);

    addListForm();
}

function changeListName(oldName, newName) {
    let storage = JSON.parse(localStorage.getItem("lists"))
    for (let i = 0; i < storage.length; i++) {
        if (storage[i] == oldName) {
            storage[i] = newName;
        }
    }
    localStorage.setItem("lists", JSON.stringify(storage));
}

function addListForm() {
        //Henter ut submitknappen
        let listNameSubmit = document.getElementById("add__list__form--submit");
        //Lager listen ved å kalle på createList funksjonen
        listNameSubmit.onclick = createList;
}

function main() {
    //Setter opp default lister
    // if (!JSON.parse(localStorage.getItem("lists"))) {
    //     localStorage.setItem("lists", JSON.stringify(
    //         ["Må gjøres", "Pågår", "Ferdig"]
    //     ))
    // }

    //Denne funksjonen rendrer listene uten å måtte refreshe
    renderLists();
    //Denne funksjonen rendrer medlemmene uten å måtte refreshe
    renderMembers();
    //Denne funksjonen rendrer oppgaver og medlemmer i drop-down menyen automatisk
    renderOptions();
    //Instantiate micromodal.js
    MicroModal.init();

    //Toggle expand
    let toggler = document.getElementsByClassName("list__item__expand");
    for (i = 0; i < toggler.length; i++) {
        toggler[i].addEventListener('click', function () {
            this.parentElement.querySelector('.list__item__expanded').classList.toggle('active');
            this.parentElement.querySelector('.list__item__expanded__controls').classList.toggle('active');
            this.classList.toggle('arrow-down');
        })
    }
}

main();