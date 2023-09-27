const optionsCont = document.querySelector(".options-cont");
const toolsCont = document.querySelector(".tools-cont");
const pencilToolCont = document.querySelector(".pencil-tool-cont");
const eraserToolCont = document.querySelector(".eraser-tool-cont");
const pencil = document.querySelector(".pencil");
const eraser = document.querySelector(".eraser");
const sticky = document.querySelector(".sticky");
const upload = document.querySelector(".upload");

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

sticky.addEventListener("click", (e) => {
  let stickyCont = document.createElement("div");
  stickyCont.setAttribute("class", "sticky-cont");
  stickyCont.innerHTML = `
  <div class="header-cont">
        <div class="minimize"></div>
        <div class="remove"></div>
  </div>
  <div class="note-cont">
        <textarea spellcheck="false"></textarea>
  </div>
  `;
  document.body.appendChild(stickyCont);
  dragAndDrop(stickyCont);
  let minimize = stickyCont.querySelector(".minimize");
  let remove = stickyCont.querySelector(".remove");
  noteActions(stickyCont, minimize, remove);
});

function dragAndDrop(element) {
  element.addEventListener("mousedown", (e) => {
    let initialX = e.clientX;
    let initialY = e.clientY;
    let { top, left } = element.getBoundingClientRect();
    let isDown = true;
    element.addEventListener("mousemove", (e) => {
      if (isDown) {
        let finalX = e.clientX;
        let finalY = e.clientY;
        let diffX = finalX - initialX;
        let diffY = finalY - initialY;
        element.style.top = top + diffY + "px";
        element.style.left = left + diffX + "px";
      }
    });
    element.addEventListener("mouseup", (e) => {
      isDown = false;
    });
  });
}

function noteActions(element, minimize, remove) {
  remove.addEventListener("click", (e) => {
    element.remove();
  });

  minimize.addEventListener("click", (e) => {
    let noteCont = element.querySelector(".note-cont");
    let display = getComputedStyle(noteCont).getPropertyValue("display");
    if (display == "block") {
      noteCont.style.display = "none";
      element.style.backgroundColor = "transparent";
    } else {
      noteCont.style.display = "block";
    }
  });
}

upload.addEventListener("click", (e) => {
  let input = document.createElement("input");
  input.setAttribute("type", "file");
  input.click();

  input.addEventListener("change", (e) => {
    let file = input.files[0];
    let url = URL.createObjectURL(file);
    let stickyCont = document.createElement("div");
    stickyCont.setAttribute("class", "sticky-cont");
    stickyCont.innerHTML = `
  <div class="header-cont">
        <div class="minimize"></div>
        <div class="remove"></div>
  </div>
  <div class="note-cont">
        <img src="${url}" />
  </div>
  `;
    document.body.appendChild(stickyCont);
    dragAndDrop(stickyCont);
    let minimize = stickyCont.querySelector(".minimize");
    let remove = stickyCont.querySelector(".remove");
    noteActions(stickyCont, minimize, remove);
  });
});
