const canvas = document.querySelector("canvas");
const pencilColor = document.querySelectorAll(".pencil-color");
const pencilWidthElem = document.querySelector(".pencil-width");
const eraserWidthElem = document.querySelector(".eraser-width");
const download = document.querySelector(".download");
const redo = document.querySelector(".redo");
const undo = document.querySelector(".undo");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let mouseDown = false;
let penColor = "red";
let eraserColor = "white";
let penWidth = pencilWidthElem.value;
let eraserWidth = eraserWidthElem.value;
let undoRedoTracker = [];
let track = 0;

let tool = canvas.getContext("2d");

tool.strokeStyle = penColor;
tool.lineWidth = penWidth;

canvas.addEventListener("mousedown", (e) => {
  mouseDown = true;
  tool.beginPath();
  tool.moveTo(e.clientX, e.clientY);
});

canvas.addEventListener("mousemove", (e) => {
  if (!mouseDown) return;
  tool.lineTo(e.clientX, e.clientY);
  tool.stroke();
});

canvas.addEventListener("mouseup", (e) => {
  mouseDown = false;
  let url = canvas.toDataURL();
  undoRedoTracker.push(url);
  track = undoRedoTracker.length - 1;
});

undo.addEventListener("click", (e) => {
  if (track <= 0) return;
  track--;
  let url = undoRedoTracker[track];
  let img = new Image();
  img.src = url;
  img.onload = function () {
    tool.clearRect(0, 0, canvas.width, canvas.height);
    tool.drawImage(img, 0, 0);
  };
});

redo.addEventListener("click", (e) => {
  if (track >= undoRedoTracker.length - 1) return;
  track++;
  let url = undoRedoTracker[track];
  let img = new Image();
  img.src = url;
  img.onload = function () {
    tool.clearRect(0, 0, canvas.width, canvas.height);
    tool.drawImage(img, 0, 0);
  };
});

pencilColor.forEach((color) => {
  color.addEventListener("click", (e) => {
    penColor = color.classList[0];
    tool.strokeStyle = penColor;
  });
});

pencilWidthElem.addEventListener("change", (e) => {
  penWidth = pencilWidthElem.value;
  tool.lineWidth = penWidth;
});

eraserWidthElem.addEventListener("change", (e) => {
  eraserWidth = eraserWidthElem.value;
  tool.lineWidth = eraserWidth;
});

eraser.addEventListener("click", (e) => {
  if (eraserFlag) {
    tool.strokeStyle = eraserColor;
    tool.lineWidth = eraserWidth;
  } else {
    tool.strokeStyle = penColor;
    tool.lineWidth = penWidth;
  }
});

download.addEventListener("click", (e) => {
  let a = document.createElement("a");
  a.download = "file.png";
  a.href = canvas.toDataURL();
  a.click();
  a.remove();
});
