
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
function handleFileSelect(evt) {
    var files = evt.target.files; // FileList object

    // Loop through the FileList and render image files as thumbnails
    for (var i = 0, f; f = files[i]; i++) {

      // Only process image files
      if (!f.type.match('image.*')) {
        continue;
      }

      var reader = new FileReader();

      // Closure to capture the file information
      reader.onload = (function(theFile) {
        return function(e) {
          // Render thumbnail
          var span = document.createElement('span');
          span.innerHTML = ['<img class="thumb" src="', e.target.result,
                            '" title="', escape(theFile.name), '"/>'].join('');
            
          document.getElementById('list').insertBefore(span, null);
          localStorage.setItem('img', e.target.result);
        };
      })(f);

      // Read in the image file as a data URL
      reader.readAsDataURL(f);
    }
  }

  document.getElementById('files').addEventListener('change', handleFileSelect, false);


  if(localStorage.img) { 

         var span = document.createElement('span');
          span.innerHTML += ['<img class="thumb" src="', localStorage.img,
                            '" title="test"/>'].join('');

          document.getElementById('list').insertBefore(span, null);
    
    }

// Function to upload profile pictures to localStorage
function handleProfileSelect(evt) {
    var profiles = evt.target.files; // FileList object

    // Loop through the FileList and render image files as thumbnails
    for (var i = 0, f; f = profiles[i]; i++) {

      // Only process image files
      if (!f.type.match('image.*')) {
        continue;
      }

      var prof_reader = new FileReader();

      // Closure to capture the file information
      prof_reader.onload = (function(theFile) {
        return function(e) {
          // Render thumbnail
          var prof_span = document.createElement('prof_span');
          prof_span.innerHTML = ['<img class="profile-pic" src="', e.target.result,
                            '" title="', escape(theFile.name), '"/>'].join('');
            
          document.getElementById('profilepic__list').insertBefore(prof_span, null);
          localStorage.setItem('img', e.target.result);
        };
      })(f);

      // Read in the image file as a data URL
      prof_reader.readAsDataURL(f);
    }
  }

  document.getElementById('profiles').addEventListener('change', handleProfileSelect, false);


  if(localStorage.img) { 

         var prof_span = document.createElement('prof_span');
          prof_span.innerHTML += ['<img class="profile-pic" src="', localStorage.img,
                            '" title="test"/>'].join('');

          document.getElementById('profilepic__list').insertBefore(prof_span, null);
    
    }