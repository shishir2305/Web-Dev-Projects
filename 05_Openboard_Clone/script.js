const optionsCont = document.querySelector(".options-cont");
const toolsCont = document.querySelector(".tools-cont");
const pencilToolCont = document.querySelector(".pencil-tool-cont");
const eraserToolCont = document.querySelector(".eraser-tool-cont");
const pencil = document.querySelector(".pencil");
const eraser = document.querySelector(".eraser");

let optionsFlag = true;
let pencilFlag = false;
let eraserFlag = false;

optionsCont.addEventListener("click", (e) => {
  optionsFlag = !optionsFlag;
  optionsFlag ? openTools() : closeTools();
});

function openTools() {
  let iconElem = optionsCont.children[0];
  iconElem.classList.remove("fa-times");
  iconElem.classList.add("fa-bars");
  toolsCont.style.display = "flex";
}

function closeTools() {
  let iconElem = optionsCont.children[0];
  iconElem.classList.remove("fa-bars");
  iconElem.classList.add("fa-times");
  toolsCont.style.display = "none";
  pencilToolCont.style.display = "none";
  eraserToolCont.style.display = "none";
}

pencil.addEventListener("click", (e) => {
  pencilFlag = !pencilFlag;
  if (pencilFlag) {
    pencilToolCont.style.display = "block";
  } else {
    pencilToolCont.style.display = "none";
  }
});

eraser.addEventListener("click", (e) => {
  eraserFlag = !eraserFlag;
  if (eraserFlag) {
    eraserToolCont.style.display = "flex";
  } else {
    eraserToolCont.style.display = "none";
  }
});
