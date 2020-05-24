
// ReadMore for task
let toggler = document.getElementsByClassName("list__item__expand");
for( i = 0; i < toggler.length; i++){
    toggler[i].addEventListener('click', function() {
        this.parentElement.querySelector('.list__item__expanded').classList.toggle('active');
        this.parentElement.querySelector('.list__item__expanded__controls').classList.toggle('active');
        this.classList.toggle('arrow-down');
    })
}

// Function to upload images to localStorage
function uploadImages(evt) {
    var name = event.target.files[0].name; // FileList object
    var reader = new FileReader();

        reader.addEventListener("load", function (){
            if(this.result && localStorage){
                window.localStorage.setItem(name, this.result);
            } else {
                alert();
            }
        });
        
        reader.readAsDataURL(event.target.files[0]);

  }

  document.getElementById('files').addEventListener('change', uploadImages, false);

// Function to show uploaded images
  function getImages(){
    var img = document.getElementById("img");
    var parentDiv = document.getElementById("list__images");

    if (parentDiv.contains(img)){
      parentDiv.prepend(img);
    } else if (parentDiv.contains(img) == false){

      for(let i = 0; i < window.localStorage.length; i++){
        let res = window.localStorage.getItem(window.localStorage.key(i));

        var image = new Image();
        image.src = res;
        document.body.append(image);
        image.setAttribute("id", "img");
        parentDiv.append(image);
      }
    }
  }

  function getImages2(){
    var img = document.getElementById("img");
    var parentDiv = document.getElementById("list__images__2");

    if (parentDiv.contains(img)){
      parentDiv.prepend(img);
    } else if (parentDiv.contains(img) == false){

      for(let i = 0; i < window.localStorage.length; i++){
        let res = window.localStorage.getItem(window.localStorage.key(i));

        var image = new Image();
        image.src = res;
        document.body.append(image);
        image.setAttribute("id", "img");
        parentDiv.append(image);
      }
    }
  }

  function getImages3(){
    var img = document.getElementById("img");
    var parentDiv = document.getElementById("list__images__3");

    if (parentDiv.contains(img)){
      parentDiv.prepend(img);
    } else if (parentDiv.contains(img) == false){

      for(let i = 0; i < window.localStorage.length; i++){
        let res = window.localStorage.getItem(window.localStorage.key(i));

        var image = new Image();
        image.src = res;
        document.body.append(image);
        image.setAttribute("id", "img");
        parentDiv.append(image);
      }
    }
  }

  function getImages4(){
    var img = document.getElementById("img");
    var parentDiv = document.getElementById("list__images__4");

    if (parentDiv.contains(img)){
      parentDiv.prepend(img);
    } else if (parentDiv.contains(img) == false){

      for(let i = 0; i < window.localStorage.length; i++){
        let res = window.localStorage.getItem(window.localStorage.key(i));

        var image = new Image();
        image.src = res;
        document.body.append(image);
        image.setAttribute("id", "img");
        parentDiv.append(image);
      }
    }
  }

  function getImages5(){
    var img = document.getElementById("img");
    var parentDiv = document.getElementById("list__images__5");

    if (parentDiv.contains(img)){
      parentDiv.prepend(img);
    } else if (parentDiv.contains(img) == false){

      for(let i = 0; i < window.localStorage.length; i++){
        let res = window.localStorage.getItem(window.localStorage.key(i));

        var image = new Image();
        image.src = res;
        document.body.append(image);
        image.setAttribute("id", "img");
        parentDiv.append(image);
      }
    }
  }

  function getImages6(){
    var img = document.getElementById("img");
    var parentDiv = document.getElementById("list__images__6");

    if (parentDiv.contains(img)){
      parentDiv.prepend(img);
    } else if (parentDiv.contains(img) == false){

      for(let i = 0; i < window.localStorage.length; i++){
        let res = window.localStorage.getItem(window.localStorage.key(i));

        var image = new Image();
        image.src = res;
        document.body.append(image);
        image.setAttribute("id", "img");
        parentDiv.append(image);
      }
    }
  }

  function getImages7(){
    var img = document.getElementById("img");
    var parentDiv = document.getElementById("list__images__7");

    if (parentDiv.contains(img)){
      parentDiv.prepend(img);
    } else if (parentDiv.contains(img) == false){

      for(let i = 0; i < window.localStorage.length; i++){
        let res = window.localStorage.getItem(window.localStorage.key(i));

        var image = new Image();
        image.src = res;
        document.body.append(image);
        image.setAttribute("id", "img");
        parentDiv.append(image);
      }
    }
  }

  function getImages8(){
    var img = document.getElementById("img");
    var parentDiv = document.getElementById("list__images__8");

    if (parentDiv.contains(img)){
      parentDiv.prepend(img);
    } else if (parentDiv.contains(img) == false){

      for(let i = 0; i < window.localStorage.length; i++){
        let res = window.localStorage.getItem(window.localStorage.key(i));

        var image = new Image();
        image.src = res;
        document.body.append(image);
        image.setAttribute("id", "img");
        parentDiv.append(image);
      }
    }
  }

  function getImages9(){
    var img = document.getElementById("img");
    var parentDiv = document.getElementById("list__images__9");

    if (parentDiv.contains(img)){
      parentDiv.prepend(img);
    } else if (parentDiv.contains(img) == false){

      for(let i = 0; i < window.localStorage.length; i++){
        let res = window.localStorage.getItem(window.localStorage.key(i));

        var image = new Image();
        image.src = res;
        document.body.append(image);
        image.setAttribute("id", "img");
        parentDiv.append(image);
      }
    }
  }

  function getImages10(){
    var img = document.getElementById("img");
    var parentDiv = document.getElementById("list__images__10");

    if (parentDiv.contains(img)){
      parentDiv.prepend(img);
    } else if (parentDiv.contains(img) == false){

      for(let i = 0; i < window.localStorage.length; i++){
        let res = window.localStorage.getItem(window.localStorage.key(i));

        var image = new Image();
        image.src = res;
        document.body.append(image);
        image.setAttribute("id", "img");
        parentDiv.append(image);
      }
    }
  }

  function getImages11(){
    var img = document.getElementById("img");
    var parentDiv = document.getElementById("list__images__11");

    if (parentDiv.contains(img)){
      parentDiv.prepend(img);
    } else if (parentDiv.contains(img) == false){

      for(let i = 0; i < window.localStorage.length; i++){
        let res = window.localStorage.getItem(window.localStorage.key(i));

        var image = new Image();
        image.src = res;
        document.body.append(image);
        image.setAttribute("id", "img");
        parentDiv.append(image);
      }
    }
  }

  function getImages12(){
    var img = document.getElementById("img");
    var parentDiv = document.getElementById("list__images__12");

    if (parentDiv.contains(img)){
      parentDiv.prepend(img);
    } else if (parentDiv.contains(img) == false){

      for(let i = 0; i < window.localStorage.length; i++){
        let res = window.localStorage.getItem(window.localStorage.key(i));

        var image = new Image();
        image.src = res;
        document.body.append(image);
        image.setAttribute("id", "img");
        parentDiv.append(image);
      }
    }
  }


// Function to upload profile pictures to localStorage
function uploadProfiles(evt) {
    var name = event.target.files[0].name; // FileList object
    var reader = new FileReader();

        reader.addEventListener("load", function (){
            if(this.result && localStorage){
                window.localStorage.setItem(name, this.result);
            } else {
                alert();
            }
        });
        
        reader.readAsDataURL(event.target.files[0]);

  }

  document.getElementById('profiles').addEventListener('change', uploadProfiles, false);

  // Function to show uploaded profile pictures
  function getProfiles(){
    var profile = document.getElementById("profile");
    var parentDiv = document.getElementById("list__profiles");

    if (parentDiv.contains(profile)){
      parentDiv.prepend(profile);
    } else if (parentDiv.contains(profile) == false){

      for(let i = 0; i < window.localStorage.length; i++){
        let res = window.localStorage.getItem(window.localStorage.key(i));

        var image = new Image();
        image.src = res;
        document.body.append(image);
        image.setAttribute("id", "profile");
        image.setAttribute("class", "profile-pic");
        parentDiv.append(image);
      }
    }
  }

  function getProfiles2(){
    var profile = document.getElementById("profile");
    var parentDiv = document.getElementById("list__profiles__2");

    if (parentDiv.contains(profile)){
      parentDiv.prepend(profile);
    } else if (parentDiv.contains(profile) == false){

      for(let i = 0; i < window.localStorage.length; i++){
        let res = window.localStorage.getItem(window.localStorage.key(i));

        var image = new Image();
        image.src = res;
        document.body.append(image);
        image.setAttribute("id", "profile");
        image.setAttribute("class", "profile-pic");
        parentDiv.append(image);
      }
    }
  }

  function getProfiles3(){
    var profile = document.getElementById("profile");
    var parentDiv = document.getElementById("list__profiles__3");

    if (parentDiv.contains(profile)){
      parentDiv.prepend(profile);
    } else if (parentDiv.contains(profile) == false){

      for(let i = 0; i < window.localStorage.length; i++){
        let res = window.localStorage.getItem(window.localStorage.key(i));

        var image = new Image();
        image.src = res;
        document.body.append(image);
        image.setAttribute("id", "profile");
        image.setAttribute("class", "profile-pic");
        parentDiv.append(image);
      }
    }
  }

  function getProfiles4(){
    var profile = document.getElementById("profile");
    var parentDiv = document.getElementById("list__profiles__4");

    if (parentDiv.contains(profile)){
      parentDiv.prepend(profile);
    } else if (parentDiv.contains(profile) == false){

      for(let i = 0; i < window.localStorage.length; i++){
        let res = window.localStorage.getItem(window.localStorage.key(i));

        var image = new Image();
        image.src = res;
        document.body.append(image);
        image.setAttribute("id", "profile");
        image.setAttribute("class", "profile-pic");
        parentDiv.append(image);
      }
    }
  }

  function getProfiles5(){
    var profile = document.getElementById("profile");
    var parentDiv = document.getElementById("list__profiles__5");

    if (parentDiv.contains(profile)){
      parentDiv.prepend(profile);
    } else if (parentDiv.contains(profile) == false){

      for(let i = 0; i < window.localStorage.length; i++){
        let res = window.localStorage.getItem(window.localStorage.key(i));

        var image = new Image();
        image.src = res;
        document.body.append(image);
        image.setAttribute("id", "profile");
        image.setAttribute("class", "profile-pic");
        parentDiv.append(image);
      }
    }
  }

  function getProfiles6(){
    var profile = document.getElementById("profile");
    var parentDiv = document.getElementById("list__profiles__6");

    if (parentDiv.contains(profile)){
      parentDiv.prepend(profile);
    } else if (parentDiv.contains(profile) == false){

      for(let i = 0; i < window.localStorage.length; i++){
        let res = window.localStorage.getItem(window.localStorage.key(i));

        var image = new Image();
        image.src = res;
        document.body.append(image);
        image.setAttribute("id", "profile");
        image.setAttribute("class", "profile-pic");
        parentDiv.append(image);
      }
    }
  }

  function getProfiles7(){
    var profile = document.getElementById("profile");
    var parentDiv = document.getElementById("list__profiles__7");

    if (parentDiv.contains(profile)){
      parentDiv.prepend(profile);
    } else if (parentDiv.contains(profile) == false){

      for(let i = 0; i < window.localStorage.length; i++){
        let res = window.localStorage.getItem(window.localStorage.key(i));

        var image = new Image();
        image.src = res;
        document.body.append(image);
        image.setAttribute("id", "profile");
        image.setAttribute("class", "profile-pic");
        parentDiv.append(image);
      }
    }
  }

  function getProfiles8(){
    var profile = document.getElementById("profile");
    var parentDiv = document.getElementById("list__profiles__8");

    if (parentDiv.contains(profile)){
      parentDiv.prepend(profile);
    } else if (parentDiv.contains(profile) == false){

      for(let i = 0; i < window.localStorage.length; i++){
        let res = window.localStorage.getItem(window.localStorage.key(i));

        var image = new Image();
        image.src = res;
        document.body.append(image);
        image.setAttribute("id", "profile");
        image.setAttribute("class", "profile-pic");
        parentDiv.append(image);
      }
    }
  }

  function getProfiles9(){
    var profile = document.getElementById("profile");
    var parentDiv = document.getElementById("list__profiles__9");

    if (parentDiv.contains(profile)){
      parentDiv.prepend(profile);
    } else if (parentDiv.contains(profile) == false){

      for(let i = 0; i < window.localStorage.length; i++){
        let res = window.localStorage.getItem(window.localStorage.key(i));

        var image = new Image();
        image.src = res;
        document.body.append(image);
        image.setAttribute("id", "profile");
        image.setAttribute("class", "profile-pic");
        parentDiv.append(image);
      }
    }
  }

  function getProfiles10(){
    var profile = document.getElementById("profile");
    var parentDiv = document.getElementById("list__profiles__10");

    if (parentDiv.contains(profile)){
      parentDiv.prepend(profile);
    } else if (parentDiv.contains(profile) == false){

      for(let i = 0; i < window.localStorage.length; i++){
        let res = window.localStorage.getItem(window.localStorage.key(i));

        var image = new Image();
        image.src = res;
        document.body.append(image);
        image.setAttribute("id", "profile");
        image.setAttribute("class", "profile-pic");
        parentDiv.append(image);
      }
    }
  }

  function getProfiles11(){
    var profile = document.getElementById("profile");
    var parentDiv = document.getElementById("list__profiles__11");

    if (parentDiv.contains(profile)){
      parentDiv.prepend(profile);
    } else if (parentDiv.contains(profile) == false){

      for(let i = 0; i < window.localStorage.length; i++){
        let res = window.localStorage.getItem(window.localStorage.key(i));

        var image = new Image();
        image.src = res;
        document.body.append(image);
        image.setAttribute("id", "profile");
        image.setAttribute("class", "profile-pic");
        parentDiv.append(image);
      }
    }
  }

  function getProfiles12(){
    var profile = document.getElementById("profile");
    var parentDiv = document.getElementById("list__profiles__12");

    if (parentDiv.contains(profile)){
      parentDiv.prepend(profile);
    } else if (parentDiv.contains(profile) == false){

      for(let i = 0; i < window.localStorage.length; i++){
        let res = window.localStorage.getItem(window.localStorage.key(i));

        var image = new Image();
        image.src = res;
        document.body.append(image);
        image.setAttribute("id", "profile");
        image.setAttribute("class", "profile-pic");
        parentDiv.append(image);
      }
    }
  }
