var gCanvas;
var gCtx;
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
  gCanvas = document.querySelector('#my-canvas');
  gCtx = gCanvas.getContext('2d');
 gPhoto = localStorage.getItem('newMeme');
  w = gCanvas.width;
  h = gCanvas.height;
  
  if (gPhoto) {
    drawImg2(gPhoto);
  }

  resizeCanvas();

  window.addEventListener('resize', () => {
    gCanvas.width = window.innerWidth * 0.8;
    gCanvas.height = window.innerHeight * 0.8;
  });

  renderEmojis();

}

function setCanvasToDraw() {

    if (!drawMode) {
        gCanvas.addEventListener("mousemove", getEventMove, false);
        gCanvas.addEventListener("mousedown", getEventDown, false);
        gCanvas.addEventListener("mouseup", getEventUp, false);
        gCanvas.addEventListener("mouseout", getEventOut, false);
        drawMode = true;
    } 
    else {
        gCanvas.removeEventListener("mousemove", getEventMove);
        gCanvas.removeEventListener("mousedown", getEventDown);
        gCanvas.removeEventListener("mouseup", getEventUp);
        gCanvas.removeEventListener("mouseout", getEventOut);
        drawMode = false;
    }
}

const getEventMove = (e) => {
    findxy('move', e)
}
const getEventDown = (e) => {
    findxy('down', e)
}
const getEventUp = (e) => {
    findxy('up', e)
}
const getEventOut = (e) => {
    findxy('out', e)
}



function draw() {
gCtx.beginPath();
gCtx.moveTo(prevX, prevY);
gCtx.lineTo(currX, currY);
gCtx.strokeStyle = gColor;
gCtx.lineWidth = y;
gCtx.stroke();
gCtx.closePath();
}


function findxy(res, e) {
if (res == 'down') {
    prevX = currX;
    prevY = currY;
    currX = e.offsetX;
    currY = e.offsetY;

    flag = true;
    dot_flag = true;
    if (dot_flag) {
        gCtx.beginPath();
        gCtx.fillStyle = gColor;
        gCtx.fillRect(currX, currY, 2, 2);
        gCtx.closePath();
        dot_flag = false;
    }
}
if (res == 'up' || res == "out") {
    flag = false;
}
if (res == 'move') {
    if (flag) {
        prevX = currX;
        prevY = currY;
        currX = e.offsetX;
        currY = e.offsetY;
        draw();
    }
}
}

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
  gCtx.clearRect(0, 0, gCanvas.width, gCanvas.height);

}


// draw img from an element
function drawImg1(el) {
  
  gCtx.drawImage(el, 0, 0, gCanvas.width / 6, gCanvas.height / 6); //img,x,y,width,height
}

// draw img from local
function drawImg2(imgSrc) {
  img = new Image();
  img.src = imgSrc;
  img.onload = () => {
    gCtx.drawImage(img, 0, 0, gCanvas.width, gCanvas.height); //img,x,y,width,height
  };
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
  drawImg2(gPhoto);
  gCtx.font = `${gFontSize}px Comic Sans MS`;
  gCtx.fillStyle = gColor;
  gCtx.textAlign = "center";
  setTimeout(fillCanvasText, 100);
    
}

function fillCanvasText() {
  let gTextTop = document.querySelector('.topText').value;
  let gTextBottom = document.querySelector('.bottomText').value;
  gCtx.fillText(gTextTop, gCanvas.width/2, gCanvas.height/4);
  gCtx.fillText(gTextBottom, gCanvas.width/2, (gCanvas.height * 3) / 4);
}


function resizeText(el) {
  if ($(el).attr("class") === 'inc') {
  gFontSize += 4;
  updateGText()
}
else if ($(el).attr("class") === 'inc') {
  gFontSize -= 4;
  updateGText()
}
}

function getEmoji(el) {
drawImg1(el);

}

// Draggable on canvas


// (function() {
//   var $wrapper = $('#content'),
//       $save = $('#save'),
//       canvas = new fabric.Canvas('canvas', {
//         width: 400,
//         height: 600
//       }),
//       txtStyles = {
//         top: 100,
//         left: 200,
//         padding: 6,
//         fill: '#d6d6d6',
//         fontFamily: 'sans-serif',
//         fontSize: '24',
//         originY: 'center',
//         originX: 'center',
//         borderColor: '#d6d6d6',
//         cornerColor: '#d6d6d6',
//         cornerSize: 5,
//         cornerStyle: 'circle',
//         transparentCorners: false,
//         lockUniScaling: true
//       },
//       imgAttrs = {
//         originY: 'center',
//         originX: 'center',
//         borderColor: '#d6d6d6',
//         cornerColor: '#d6d6d6',
//         cornerSize: 5,
//         cornerStyle: 'circle',
//         transparentCorners: false,
//         lockUniScaling: true
//       },
//       introTxt = new fabric.Text('Paste images here', txtStyles),
//       pasteImage = function (e) {
//         var items=e.originalEvent.clipboardData.items;

//         e.preventDefault();
//         e.stopPropagation();
//         canvas.remove(introTxt);

//         //Loop through files
//         for(var i=0;i<items.length;i++){
//           if (items[i].type.indexOf('image')== -1) {
//             continue;
//           }
//           var file = items[i],
//               type = items[i].type,
//               imageData = file.getAsFile(),
//               URLobj = window.URL || window.webkitURL,
//               img = new Image();
//           img.src = URLobj.createObjectURL(imageData);
//           fabric.Image.fromURL(img.src, function(img){
//             img.scaleToWidth(350);
//             canvas.add(img).centerObject(img);
//             img.setCoords();
//             canvas.renderAll();
//           }, imgAttrs);
//         }
//       },

//       //Canvas functions
//       introCanvas = function() {
//         canvas.add(introTxt).centerObject(introTxt);
//         introTxt.setCoords();
//         canvas.renderAll();
//       },
//       resizeCanvas = function() {
//         var winW = $(window).width(),
//             winH = $(window).height(),
//             curW = canvas.getWidth(),
//             curH = canvas.getHeight(),
//             canW = winW - 75,
//             canH = winH - 60;

//         /*  $wrapper.add('.refs').css({
//           width: canW,
//           height: canH
//         }); */
//         canvas.setWidth(canW);
//         canvas.setHeight(canH);
//         canvas.renderAll();
//       };

//   introCanvas();
//   $(window).on('paste', pasteImage);

//   //Resize board
//   $(window).resize(resizeCanvas);
// })();