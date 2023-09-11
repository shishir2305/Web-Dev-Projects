const addBtn = document.querySelector(".add-btn");
const removeBtn = document.querySelector(".remove-btn");
const modalCont = document.querySelector(".modal-cont");
const mainCont = document.querySelector(".main-cont");
const textareaCont = document.querySelector(".textarea-cont");
const allPriorityColors = document.querySelectorAll(".priority-color");
const lockElem = document.querySelector(".ticket-lock");
const colorFilter = document.querySelectorAll(".color");

const colors = ["lightpink", "lightblue", "lightgreen", "black"];
let modalPriorityColor = colors[colors.length - 1];
let addFlag = false;
let removeFlag = false;
const lockClass = "fa-lock";
const unlockClass = "fa-lock-open";
let ticketsArr = [];

allPriorityColors.forEach((colorElem, idx) => {
  colorElem.addEventListener("click", (e) => {
    allPriorityColors.forEach((colorElem) => {
      colorElem.classList.remove("border");
    });
    colorElem.classList.add("border");
    modalPriorityColor = colorElem.classList[1];
  });
});

colorFilter.forEach((colorElem) => {
  colorElem.addEventListener("click", (e) => {
    let currColor = colorElem.classList[1];
    let allTickets = document.querySelectorAll(".ticket-cont");
    allTickets.forEach((ticket) => {
      let ticketColor = ticket.querySelector(".ticket-color");
      let ticketColorClass = ticketColor.classList[1];
      if (currColor == ticketColorClass) {
        ticket.style.display = "block";
      } else {
        ticket.style.display = "none";
      }
    });
  });
});

colorFilter.forEach((colorElemt) => {
  colorElemt.addEventListener("dblclick", (e) => {
    let allTickets = document.querySelectorAll(".ticket-cont");
    allTickets.forEach((ticket) => {
      ticket.style.display = "block";
    });
  });
});

addBtn.addEventListener("click", () => {
  addFlag = !addFlag;
  if (addFlag) {
    modalCont.style.display = "flex";
  } else {
    modalCont.style.display = "none";
  }
  textareaCont.focus();
});

modalCont.addEventListener("keydown", (e) => {
  if (e.key == "Shift") {
    createTicket(modalPriorityColor, shortid(), textareaCont.value);
    modalCont.style.display = "none";
    addFlag = false;
    textareaCont.value = "";
  }
});

removeBtn.addEventListener("click", () => {
  removeFlag = !removeFlag;
});

function createTicket(ticketColor, ticketID, ticketTask) {
  let ticketCont = document.createElement("div");
  ticketCont.setAttribute("class", "ticket-cont");
  ticketCont.innerHTML = `
    <div class="ticket-color ${ticketColor}"></div>
    <div class="ticket-id">#${ticketID}</div>
    <div class="task-area">${ticketTask}</div>
    <div class="ticket-lock">
        <i class="fa-solid fa-lock"></i>
      </div>
  `;
  ticketsArr.push({
    ticketColor,
    ticketID,
    ticketTask,
  });
  mainCont.appendChild(ticketCont);
  handleRemoval(ticketCont);
  handleLock(ticketCont);
  handleColor(ticketCont);
}

function handleRemoval(ticket) {
  if (removeFlag) {
    ticket.remove();
  }
}

function handleLock(ticket) {
  let ticketLockElem = ticket.querySelector(".ticket-lock");
  let ticketTaskArea = ticket.querySelector(".task-area");
  let ticketLock = ticketLockElem.children[0];
  ticketLock.addEventListener("click", () => {
    if (ticketLock.classList.contains(lockClass)) {
      ticketLock.classList.remove(lockClass);
      ticketLock.classList.add(unlockClass);
      ticketTaskArea.setAttribute("contenteditable", "true");
    } else {
      ticketLock.classList.remove(unlockClass);
      ticketLock.classList.add(lockClass);
      ticketTaskArea.setAttribute("contenteditable", "false");
    }
  });
}

function handleColor(ticket) {
  let ticketColor = ticket.querySelector(".ticket-color");
  ticketColor.addEventListener("click", () => {
    let currColor = ticketColor.classList[1];
    let idx = colors.indexOf(currColor);
    let newIdx = (idx + 1) % colors.length;
    ticketColor.classList.remove(currColor);
    ticketColor.classList.add(colors[newIdx]);
  });
}
