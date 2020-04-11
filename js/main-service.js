'use strict'

let gIdx = 1;

let gPhotos = [
    {id: gIdx++, keywords: 'trump Trump president', src: 'meme-imgs (square)/1.jpg'},
    {id: gIdx++, keywords: 'animals dogs Dogs', src: 'meme-imgs (square)/2.jpg'},
    {id: gIdx++, keywords: 'baby Baby dog Dog animals' ,src: 'meme-imgs (square)/3.jpg'},
    {id: gIdx++, keywords: 'animals cat Cat cats', src: 'meme-imgs (square)/4.jpg'},
    {id: gIdx++, keywords: 'sucsses baby fist eat sand', src: 'meme-imgs (square)/5.jpg'},
    {id: gIdx++, keywords: 'aliens alien guy', src: 'meme-imgs (square)/6.jpg'},
    {id: gIdx++, keywords: 'omg wow baby', src: 'meme-imgs (square)/7.jpg'},
    {id: gIdx++, keywords: 'tell me more wili wanka charli cool Cool' ,src: 'meme-imgs (square)/8.jpg'},
    {id: gIdx++, keywords: 'evil laugh baby Funny funny' ,src: 'meme-imgs (square)/9.jpg'},
    {id: gIdx++, keywords: 'obama laugh president Funny funny', src: 'meme-imgs (square)/10.jpg'},
];

function initialLocalStorageSet() {
    const photos = JSON.parse(localStorage.getItem("photos"));
    if (!photos) {
        localStorage.setItem("photos", JSON.stringify(gPhotos));
    }
    else return
}

initialLocalStorageSet()

function getPhotos() {
    const photos = JSON.parse(localStorage.getItem("photos"));
    gPhotos = photos
    return gPhotos;
}

function searchPhotoInData(value) {
    const patt = new RegExp(value);
    const matched = gPhotos.filter(photo => patt.test(photo.keywords));
    return matched;
}

function addPhotoToData(desc, src) {
    const newPhoto = {id: gIdx++, keywords: desc , src: src}
    gPhotos.push(newPhoto);
    localStorage.setItem("photos", JSON.stringify(gPhotos));
}