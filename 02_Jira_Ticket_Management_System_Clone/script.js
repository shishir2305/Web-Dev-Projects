const addBtn = document.querySelector(".add-btn");
const modalCont = document.querySelector(".modal-cont");
const mainCont = document.querySelector(".main-cont");
const textareaCont = document.querySelector(".textarea-cont");
let addFlag = false;

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
    createTicket();
    modalCont.style.display = "none";
    addFlag = false;
    textareaCont.value = "";
  }
});

function createTicket() {
  let ticketCont = document.createElement("div");
  ticketCont.setAttribute("class", "ticket-cont");
  ticketCont.innerHTML = `
    <div class="ticket-color"></div>
    <div class="ticket-id">#example</div>
    <div class="task-area">Lorem ipsum dolor sit amet consectetur adipisicing elit. Assumenda,
    aperiam! Id fuga, itaque odio illum eveniet nihil reiciendis
    reprehenderit quisquam.</div>
  `;
  mainCont.appendChild(ticketCont);
}
