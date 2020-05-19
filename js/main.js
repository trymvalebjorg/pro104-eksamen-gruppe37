// ReadMore for task
let toggler = document.getElementsByClassName("list__item__expand");
for( i = 0; i < toggler.length; i++){
    toggler[i].addEventListener('click', function() {
        this.parentElement.querySelector('.list__item__expanded').classList.toggle('active');
        this.parentElement.querySelector('.list__item__expanded__controls').classList.toggle('active');
        this.classList.toggle('arrow-down');
    })
}

/* Generating unique ID for new Input */
function guid() {
    return parseInt(Date.now() + Math.random());
}

/* Create and save a new list */
function saveList() {
    let keys = ['title'];
    let obj = {};

    keys.forEach(function (item) {
        let result = document.getElementById(item).value;
        if (result) {
            obj[item] = result;
        }
    })

    if (Object.keys(obj).length) {
        let lists = getLists();
        obj.id = guid();
        lists.push(obj);
        let data = JSON.stringify(lists);
        localStorage.setItem("lists", data);
        newList(obj);
    }
}

/* Get All lists already stored into the local storage */
function getLists() {
    var listRecord = localStorage.getItem("lists");
    var lists = [];
    if (!listRecord) {
        return lists;
    } else {
        lists = JSON.parse(listRecord);
        return lists;
    }
}

function newList(item) {

    let main = document.getElementsByTagName('main')[0];
    let newList = document.createElement('div');
    let header = document.createElement('div');
    let actionBtn = document.createElement('button');
    let addTask = document.createElement('div');
   
    newList.className = 'list'; 
   
    header.className = 'list__header';
    header.innerHTML = `
        <img src="img/icons/album.svg" alt="an icon" class="icon">
        <h3>${item.title}</h3>`;
    
    actionBtn.className = 'list__action-btn btn btn--round btn--add';
    
    addTask.className = 'list__item';
    addTask.innerHTML = "Create a new task!"

    main.appendChild(newList);
    newList.appendChild(actionBtn);
    newList.appendChild(header);
    newList.appendChild(addTask);

}

