


function initIndex() {
renderPhotos();
}

function renderPhotos() {
    const photos = getPhotos();
    const gallery = document.querySelector('.gallery');
    photos.forEach(photo => {
        gallery.innerHTML += `<img src="meme-imgs (square)/${photo.id}.jpg" onclick="getPhoto(this)">`  
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

