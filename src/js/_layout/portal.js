import dayjs from "dayjs";

import { newScheduleModal } from "./modal/newSchedule";
import { datePickerModal } from "./modal/datePickerModal";
import { positionModal } from "./modal/positionModal";
import { datePicker } from "./datepicker";
import { dropdown } from "./dropdown";
import { formSubmit } from "../form/submit";
import { inputMask } from "./inputMask";
import { selectDate } from "./selectDate"; // Importa a função selectDate

export const portal = document.getElementById("portal");

const newSchedule = document.getElementById("newSchedule");
const openDatePickerButton = document.getElementById("datePicker");

let selectDateModal;
let referenceElement;
let datepickerHeader;
let lastClickedElement;

newSchedule.addEventListener("click", () => {
  // Renderiza o modal
  const form = newScheduleModal();
  portal.appendChild(form);

  // Inicializa o submit do formulário
  formSubmit();
  // Aplica as máscaras nos inputs
  inputMask();

  // Armazena o botão de fechar
  const closeButton = form.querySelector(".close");

  // Adiciona o event listener para selectDateModal após o modal ser renderizado
  selectDateModal = document.getElementById("selectDateModal");
  const dateModal = document.getElementById("dateModal");
  if (selectDateModal) {
    selectDateModal.addEventListener("click", handleDatePickerClick);
  }
  dateModal.textContent = dayjs().format("DD/MM/YYYY");

  // Handler para clique fora do modal
  // Handler para clique fora do modal
  const clickOutsideHandler = (e) => {
    if (
      (!form.contains(e.target) &&
        !newSchedule.contains(e.target) &&
        !selectDateModal) ||
      e.target === closeButton
    ) {
      // Verifica se o elemento ainda está no portal antes de removê-lo
      if (portal.contains(form)) {
        portal.removeChild(form);
        document.removeEventListener("click", clickOutsideHandler);
      }
    }
  };

  document.addEventListener("click", clickOutsideHandler);

  // Handler para clique no botão de hora
  const selectHour = document.getElementById("selectHourModal");
  selectHour.addEventListener("click", handleDropdownClick);
});

// Handler para clique no botão de data
// Handler para clique no botão de data
function handleDatePickerClick(e) {
  e.stopPropagation();
  const currentTarget = e.currentTarget;

  // Fecha qualquer modal aberto
  closeOpenModals();

  // Armazena o elemento clicado
  lastClickedElement = currentTarget;

  // Renderiza o datePickerModal
  referenceElement = datePickerModal();
  datepickerHeader = referenceElement.querySelector("header");
  portal.appendChild(referenceElement);

  // Handler para clique fora do datePickerModal
  const clickOutsideHandler = (e) => {
    if (
      referenceElement &&
      !referenceElement.contains(e.target) &&
      !currentTarget.contains(e.target)
    ) {
      // Verifica se o elemento ainda está no portal antes de removê-lo
      if (portal.contains(referenceElement)) {
        portal.removeChild(referenceElement);
        referenceElement = null;
        document.removeEventListener("click", clickOutsideHandler);
        lastClickedElement = null;
      }
    }
  };

  document.addEventListener("click", clickOutsideHandler);

  // Posiciona o datePickerModal
  if (currentTarget.id === "selectDateModal") {
    positionModal(currentTarget, referenceElement, "above");
    referenceElement.style.display = "flex";
    referenceElement.style.flexDirection = "column-reverse";
    datepickerHeader.classList.add("above");
  } else {
    positionModal(currentTarget, referenceElement);
    referenceElement.style.display = "flex";
    referenceElement.style.flexDirection = "column";
  }

  // Passa a função de seleção de data como parâmetro
  datePicker(referenceElement, (day) => selectDate(day, currentTarget, portal));
}

// Handler para clique no dropdown
function handleDropdownClick(e) {
  e.stopPropagation();
  const currentTarget = e.currentTarget;

  // Fecha qualquer modal aberto
  closeOpenModals();

  // Armazena o elemento clicado
  lastClickedElement = currentTarget;

  // Renderiza o dropdown
  referenceElement = dropdown();
  portal.appendChild(referenceElement);

  // Handler para clique fora do dropdown
  const clickOutsideDropdownHandler = (e) => {
    if (
      referenceElement &&
      !referenceElement.contains(e.target) &&
      !currentTarget.contains(e.target)
    ) {
      // Verifica se o elemento ainda está no portal antes de removê-lo
      if (portal.contains(referenceElement)) {
        portal.removeChild(referenceElement);
        referenceElement = null;
        document.removeEventListener("click", clickOutsideDropdownHandler);
        lastClickedElement = null;
      }
    }
  };

  document.addEventListener("click", clickOutsideDropdownHandler);

  // Adiciona event listener para itens do dropdown
  const hourModal = document.getElementById("hourModal");
  const dropdownItems = referenceElement.querySelectorAll("li");
  dropdownItems.forEach((item) => {
    item.addEventListener("click", () => {
      // Fecha o dropdown ao selecionar um horário
      document.removeEventListener("click", clickOutsideDropdownHandler);
      if (portal.contains(referenceElement)) {
        portal.removeChild(referenceElement);
      }
      referenceElement = null;
      lastClickedElement = null;
      hourModal.textContent = item.textContent;
      hourModal.value = item.textContent;
    });
  });

  // Posiciona o dropdown
  positionModal(currentTarget, referenceElement, "below");
}

openDatePickerButton.addEventListener("click", handleDatePickerClick);

function closeOpenModals() {
  if (referenceElement && portal.contains(referenceElement)) {
    portal.removeChild(referenceElement);
    referenceElement = null;
    lastClickedElement = null;
  }
}
