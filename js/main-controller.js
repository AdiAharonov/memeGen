const gallery = document.querySelector('.gallery');



function initIndex() {
renderPhotos();
}

function renderPhotos() {
    gallery.innerHTML = "";
    const photos = getPhotos();
    photos.forEach(photo => {

        gallery.innerHTML += `<img src="${photo.src}" onclick="getPhoto(this)">`  
    }); 
}

function getPhoto(el) {
    localStorage.setItem('newMeme', el.src.toString());
    window.location.href = 'generator.html';
}

function toggleModal() {
    if ($('.screen').css("opacity") === "0") {
        $('.screen').css("z-index", "20");
        $('.screen').css("opacity", "1");
        $('.modal').css("transform", "translateY(0)");
    }
    else {
        $('.screen').css("opacity", "0");
        $('.modal').css("transform", "translateY(-500px)");
        $('.file').val("");
        $('#url').val("");

        setTimeout(() => {
            $('.screen').css("z-index", "-1");
        }, 400)
    }

}


function ShowMatches(value) {
    const matched = searchPhotoInData(value);
    gallery.innerHTML = "";
    matched.forEach(match => gallery.innerHTML += `<img src="meme-imgs (square)/${match.id}.jpg" onclick="getPhoto(this)">`)
}


// upload image
function uploadToGallery() {
    const urlVal = $('#url').val();
    const fileVal = $('#file').val();
    const desc = $('descriptiom').val();
    
    if (urlVal !== "" || fileVal !== "") {
        if (urlVal !== "") {
        addPhotoToData(desc, urlVal);
        } 
        if (fileVal !== "") {
        addPhotoToData(desc, fileVal);
       }
       
       renderPhotos();
       toggleModal();
    }
    else return
    
}