const modal = document.getElementById("scheduleModal");
const openModalBtn = document.getElementById("newSchedule");
const closeModalBtn = document.querySelector(".close");

// Abre o modal ao clicar no botão
openModalBtn.onclick = function () {
  modal.style.display = "block";
};

// Fecha o modal ao clicar no botão 'x'
closeModalBtn.onclick = function () {
  modal.style.display = "none";
};

// Fecha o modal ao clicar fora dele
window.onclick = function (event) {
  if (event.target === modal) {
    modal.style.display = "none";
  }
};
