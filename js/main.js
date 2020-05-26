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
            for(let j = 0; j < listItem.length; j++){
                if(listItem[j].innerHTML.includes(memVal)){
                    alert("Already assigned");
                } else {
                    assignedList.push({ taskVal, memVal });
                    localStorage.setItem("assignedList", JSON.stringify(assignedList));
                    location.reload();
                }
            }
            //Hvis det stemmer, push verdiene til localstorage arrayet
            //Sett assignedList til localStorage(oversikt over hvem som gjør hva)
            //Hvis den spesifikke div'en i listen har verdien av taskVal, skriv deretter ut diven
        }
    }
}

function handleFileSelect(event) {
    function handleFileLoad(event) {
        const previewDiv = document.getElementById('image-preview');
        previewDiv.innerHTML = `<img src="${event.target.result}"/>`;
        document.querySelector('[name="image"]').dataset.image = event.target.result;
    }

    const reader = new FileReader();
    reader.onload = handleFileLoad;
    reader.readAsDataURL(event.target.files[0])
}

//Funksjon for å legge til medlemmer
function addMember(event) {
    event.preventDefault();
    //Hente ut input-verdier
    let memberInput = document.getElementById("add__member__form--text");
    //Memberinputet sin verdi (navnet)
    let memberName = memberInput.value;

    let profilePic = document.querySelector('[name="image"]').dataset.image;
    //Lager en member liste i local storage
    let memberList = JSON.parse(localStorage.getItem("memberList")) || [];

    //Pusher input-verdien (altså medlemnavn) til localstorage
    memberList.push({ memberName, profilePic });
    //Resetter valuen
    memberInput.value = "";
    //Setter det i memberList inne i localStorage
    localStorage.setItem("memberList", JSON.stringify(memberList));
    //Kaller på renderMembers funksjonen for å få printet ut navnet
    renderMembers();
    location.reload();

}

//Funksjon for å vise medlemmer
function renderMembers() {
    //Henter ut member list fra localstorage
    let memberList = JSON.parse(localStorage.getItem("memberList")) || [];
    //Henter outputdiv for å skrive ut verdien som blir hentet fra localstorage
    let toolbarMemberOutput = document.querySelector('.toolbar__members__output');
    //Looper gjennom å skriver ut alle member-navn som er lagret i localstorage
    for (let i = 0; i < memberList.length; i++) {
        //Printer det ut
        toolbarMemberOutput.innerHTML += `<div class="toolbar__members__output__members">
                                            <h3 class="member-name">${memberList[i].memberName.charAt(0)}</h3>
                                            <img class="profile-pic" src="${memberList[i].profilePic}" />
                                          </div>`;
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
    location.reload();
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

            // Prioritering
            let importance = document.createElement("figure");
            importance.className = `list__item__importance__menu__dot dot ${task.importance}`;

            importance.onclick = function(){

                MicroModal.show('modal-importance');

                let greenLi = document.getElementById('importance--green');
                let yellowLi = document.getElementById('importance--yellow');
                let redLi = document.getElementById('importance--red');

                greenLi.addEventListener('click', function() {
                    changeTaskImportance(task.task, 'dot--green');
                    location.reload();
                })

                yellowLi.addEventListener('click', function() {
                    changeTaskImportance(task.task, 'dot--yellow');
                    location.reload();
                })

                redLi.addEventListener('click', function() {
                    changeTaskImportance(task.task, 'dot--red');
                    location.reload();
                })
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
            listItemMembers.innerHTML += '<div class="list__item__expanded__members__assigned">Medlemmer:'


            let listItemExpandedControls = document.createElement("div");
            listItemExpandedControls.className = "list__item__expanded__controls";

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
        addTaskButton.className = "btn--morph--white btn--add btn--add-task";        

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
     if (!JSON.parse(localStorage.getItem("lists"))) {
         localStorage.setItem("lists", JSON.stringify(
             ["Må gjøres", "Pågår", "Ferdig"]
         ))
     }

    //Setter opp dummy-medlemmer
     if (!JSON.parse(localStorage.getItem("memberList"))) {
        localStorage.setItem("memberList", JSON.stringify(
            [{
            memberName: "Johannes", 
            profilePic: "data:image/jpeg;base64,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"
            },

            {
                memberName: "Elisabeth", 
                profilePic: "data:image/jpeg;base64,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"
            }
        ]
        ))
    }

    //Setter opp dummy-tasks
    if (!JSON.parse(localStorage.getItem("tasks"))) {
        localStorage.setItem("tasks", JSON.stringify(
            [{ task:"Dette er en oppgave!", date:"27-05-2020 09:00", importance:"dot--green", list:"Må gjøres" }, 
            { task:"Oppgaver kan dras fra liste til liste!", date:"27-05-2020 09:00", importance:"dot--yellow", list:"Må gjøres" },
            { task:"Denne oppgaven haster!", date:"27-05-2020 09:00", importance:"dot--red", list:"Pågår" }]
        ))
    }

    //Setter opp dummy-assign
    if (!JSON.parse(localStorage.getItem("assignedList"))) {
        localStorage.setItem("assignedList", JSON.stringify(
            [{taskVal:"Dette er en oppgave!",memVal:"Johannes"}, {taskVal:"Dette er en oppgave!", memVal:"Elisabeth"},
            {taskVal:"Oppgaver kan dras fra liste til liste!", memVal:"Johannes"},
            {taskVal:"Denne oppgaven haster!", memVal:"Elisabeth"}]
        ))
    }

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