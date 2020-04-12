var gCanvas = new fabric.Canvas('c');
var gCtx = gCanvas.getContext('2d');
let gColor = 'black';
let gPhoto;
let drawMode = false;
let gBrushSize = 20;
 

function init() {
 gPhoto = localStorage.getItem('newMeme');
 
  if (gPhoto) {
    gCanvas.setBackgroundImage(gPhoto, gCanvas.renderAll.bind(gCanvas), {
      width: gCanvas.width,
      height: gCanvas.height,
      originX: 'left',
      originY: 'top'
  });
  
  }

  resizeCanvas();

  window.addEventListener('resize', () => {
    gCanvas.width = window.innerWidth * 0.8;
    gCanvas.height = window.innerHeight * 0.8;
    gCanvas.backgroundImage.width = window.innerWidth * 0.8;
    gCanvas.backgroundImage.height = window.innerHeight * 0.8;
  });

  renderEmojis();
  
}

// upload image
function uploadUrl(el) {
    const urlVal = $('#url').val();
    const fileVal = $('#file').val();
    
    if (urlVal !== "" || fileVal !== "") {
        if (urlVal !== "") {
            drawImg2(urlVal);
            toggleModal();
        } 
        if (fileVal !== "") {
            drawImg2(fileVal);
            toggleModal();
        }
    }
    else return

}


function clearCanvas() {

  gCanvas.getActiveObjects().forEach((obj) => {
    gCanvas.remove(obj)
  });
  gCanvas.discardActiveObject().renderAll()

}


// draw img from an element
function drawImg1(el) {
  
  var imgInstance = new fabric.Image(el, {
    left: 200,
    top: 10,
    angle: 90,
    opacity: 1
  });
  gCanvas.add(imgInstance);
  
}

// draw img from local
function drawImg2(imgSrc) {
  fabric.Image.fromURL(imgSrc, function(oImg) {
    gCanvas.add(oImg);
  });
}

// draw img from google
function drawImg3() {
  var img = new Image();
  img.src =
    'https://www.globalequinesires.com/wp-content/uploads/2018/01/a1cf4ea1-67a2-447f-8e83-453cacbae6b7.jpg';
  img.onload = () => {
    gCtx.drawImage(img, 0, 0, gCanvas.width, gCanvas.height); //img,x,y,xend,yend
  };
}

function resizeCanvas() {
  var elContainer = document.querySelector('.canvas-container');
  // Note: changing the canvas dimension this way clears the canvas
  gCanvas.width = elContainer.offsetWidth;
  gCanvas.height = elContainer.offsetHeight;
}

// download image
function downloadCanvas(el) {
  var image = gCanvas.toDataURL("image/png");
  el.href = image;
};

// update color
function setColor(color) { 
  $('.color-icon').css("background", `linear-gradient(124deg, ${color} 42%, rgba(255,255,255,1) 68%)`);
    gColor = color;
    gCanvas.freeDrawingBrush.color = gColor;
 }

function renderEmojis() {
     const emojisContainer = document.querySelector('.emojis-container');
     const emojis = getEmojis();

     emojis.forEach(emoji => {
         emojisContainer.innerHTML += `<img src="emojis/${emoji.id}.png" onclick="getEmoji(this)">`
     })
 }

 // update text on canvas

function updateGText() {
let gTextTop = document.querySelector('.topText');
let gTextBottom = document.querySelector('.bottomText');

var textTop = new fabric.Text(gTextTop.value, {
  left: gCanvas.width/4,
  top: gCanvas.height/4,
  fontSize: 30,
  fontFamily: 'Verdana',
  fill: `${gColor}`
});

var textBottom = new fabric.Text(gTextBottom.value, {
  left: gCanvas.width/4,
  top: (gCanvas.height * 3) / 4,
  fontSize: 30,
  fontFamily: 'Verdana',
  fill: `${gColor}`
});
  
  gCtx.textAlign = "center";
  gCanvas.add(textTop, textBottom);
  
  gTextTop.value = "";
  gTextBottom.value = "";
   
}


//Draw emoji

function getEmoji(el) {
drawImg1(el);
}


// Draw mode

function toggleDrawMode() {
  if (!drawMode) {
    gCanvas.isDrawingMode= 1;
    gCanvas.freeDrawingBrush.color = gColor;
    gCanvas.freeDrawingBrush.width = gBrushSize;
    gCanvas.renderAll();
    drawMode = true;
  }
  else {
    gCanvas.isDrawingMode= 0;
    gCanvas.renderAll();
    drawMode =  false;
  }
};

// update presented num on screen and brush size
function showNum(value) {
  gBrushSize = value;
  $('#brushSize').text(gBrushSize);
  gCanvas.freeDrawingBrush.width = gBrushSize;
  gCanvas.renderAll();
}