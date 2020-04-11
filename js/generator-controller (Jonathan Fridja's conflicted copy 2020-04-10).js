var gCanvas = new fabric.Canvas('c');
var gCtx = gCanvas.getContext('2d');
let gColor = 'black';
let gPhoto;
let drawMode = false;
var flag = false,
prevX = 0,
currX = 0,
prevY = 0,
currY = 0,
dot_flag = false;

var y = 2;

let gFontSize = 30;



function init() {
  
 gPhoto = localStorage.getItem('newMeme');
 
  if (gPhoto) {
    gCanvas.setBackgroundImage(gPhoto, gCanvas.renderAll.bind(gCanvas), {
      backgroundImageOpacity: 0.5,
      backgroundImageStretch: false
  });
  }

  resizeCanvas();

  window.addEventListener('resize', () => {
    gCanvas.width = window.innerWidth * 0.8;
    gCanvas.height = window.innerHeight * 0.8;
  });

  renderEmojis();
  
}

// function setCanvasToDraw() {

//     if (!drawMode) {
//         gCanvas.addEventListener("mousemove", getEventMove, false);
//         gCanvas.addEventListener("mousedown", getEventDown, false);
//         gCanvas.addEventListener("mouseup", getEventUp, false);
//         gCanvas.addEventListener("mouseout", getEventOut, false);
//         drawMode = true;
//     } 
//     else {
//         gCanvas.removeEventListener("mousemove", getEventMove);
//         gCanvas.removeEventListener("mousedown", getEventDown);
//         gCanvas.removeEventListener("mouseup", getEventUp);
//         gCanvas.removeEventListener("mouseout", getEventOut);
//         drawMode = false;
//     }
// }

// const getEventMove = (e) => {
//     findxy('move', e)
// }
// const getEventDown = (e) => {
//     findxy('down', e)
// }
// const getEventUp = (e) => {
//     findxy('up', e)
// }
// const getEventOut = (e) => {
//     findxy('out', e)
// }



// function draw() {
// gCtx.beginPath();
// gCtx.moveTo(prevX, prevY);
// gCtx.lineTo(currX, currY);
// gCtx.strokeStyle = gColor;
// gCtx.lineWidth = y;
// gCtx.stroke();
// gCtx.closePath();
// }


// function findxy(res, e) {
// if (res == 'down') {
//     prevX = currX;
//     prevY = currY;
//     currX = e.offsetX;
//     currY = e.offsetY;

//     flag = true;
//     dot_flag = true;
//     if (dot_flag) {
//         gCtx.beginPath();
//         gCtx.fillStyle = gColor;
//         gCtx.fillRect(currX, currY, 2, 2);
//         gCtx.closePath();
//         dot_flag = false;
//     }
// }
// if (res == 'up' || res == "out") {
//     flag = false;
// }
// if (res == 'move') {
//     if (flag) {
//         prevX = currX;
//         prevY = currY;
//         currX = e.offsetX;
//         currY = e.offsetY;
//         draw();
//     }
// }
// }

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

function downloadCanvas(elLink) {
  const data = gCanvas.toDataURL();
  elLink.href = data;
  elLink.download = 'my-img.jpg';
}


function setColor(color) { 
    gColor = color;
 }

 function renderEmojis() {
     const emojisContainer = document.querySelector('.emojis-container');
     const emojis = getEmojis();

     emojis.forEach(emoji => {
         emojisContainer.innerHTML += `<img src="emojis/${emoji.id}.png" onclick="getEmoji(this)">`
     })
 }

function updateGText() {
  clearCanvas();
  gCanvas.setBackgroundImage(gPhoto, gCanvas.renderAll.bind(gCanvas), {
    backgroundImageOpacity: 0.5,
    backgroundImageStretch: false
});

let gTextTop = document.querySelector('.topText').value;
let gTextBottom = document.querySelector('.bottomText').value;

var textTop = new fabric.Text(gTextTop, {
  left: gCanvas.width/4,
  top: gCanvas.height/4,
  fontSize: `${gFontSize}`,
  fontFamily: 'Verdana',
  fill: `${gColor}`
});

var textBottom = new fabric.Text(gTextBottom, {
  left: gCanvas.width/4,
  top: (gCanvas.height * 3) / 4,
  fontSize: `${gFontSize}`,
  fontFamily: 'Verdana',
  fill: `${gColor}`
});
  
  gCtx.textAlign = "center";
  gCanvas.add(textTop, textBottom);
    
}




function resizeText(el) {
  if ($(el).attr("class") === 'inc') {
  gFontSize += 4;
  updateGText()
}
else if ($(el).attr("class") === 'dec') {
  gFontSize -= 4;
  updateGText()
}
}

function getEmoji(el) {
drawImg1(el);

}



// Draw mode

function () {
  gCanvas.isDrawingMode= 1;
  gCanvas.freeDrawingBrush.color = gColor;
  gCanvas.freeDrawingBrush.width = 5;
  gCanvas.renderAll();
};