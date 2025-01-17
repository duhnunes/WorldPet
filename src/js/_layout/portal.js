import dayjs from "dayjs";

import { newScheduleModal } from "./modal/newSchedule";
import { datePickerModal } from "./modal/datePickerModal";
import { positionModal } from "./modal/positionModal";
import { datePicker } from "./datepicker";
import { dropdown } from "./dropdown";
import { formSubmit } from "../form/submit";
import { inputMask } from "./inputMask";

const portal = document.getElementById("portal");

const newSchedule = document.getElementById("newSchedule");
const openDatePickerButton = document.getElementById("datePicker");

let selectDateModal;
let referenceElement;
let datepickerHeader;
let lastClickedElement;

newSchedule.addEventListener("click", (e) => {
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
  const clickOutsideHandler = (e) => {
    if (
      (!form.contains(e.target) &&
        !newSchedule.contains(e.target) &&
        !selectDateModal) ||
      e.target === closeButton
    ) {
      portal.removeChild(form);
      document.removeEventListener("click", clickOutsideHandler);
    }
  };
  document.addEventListener("click", clickOutsideHandler);

  // Handler para clique no botão de hora
  const selectHour = document.getElementById("selectHourModal");
  selectHour.addEventListener("click", handleDropdownClick);
});

// Handler para clique no botão de data
function handleDatePickerClick(e) {
  e.stopPropagation();

  // Fecha o dropdown se estiver aberto
  if (referenceElement && referenceElement.classList.contains("dropdown")) {
    portal.removeChild(referenceElement);
    referenceElement = null;
  }

  // Armazena o elemento clicado
  const currentTarget = e.currentTarget;

  // Fecha o datePickerModal
  if (referenceElement && lastClickedElement === currentTarget) {
    portal.removeChild(referenceElement);
    referenceElement = null;
    lastClickedElement = null;
    return;
  }

  // Armazena o elemento clicado
  lastClickedElement = currentTarget;

  // Renderiza o datePickerModal
  if (!referenceElement) {
    referenceElement = datePickerModal();
    datepickerHeader = referenceElement.querySelector("header");
    portal.appendChild(referenceElement);
  }

  // Handler para clique fora do datePickerModal
  const clickOutsideHandler = (e) => {
    if (
      openDatePickerButton &&
      !openDatePickerButton.contains(e.target) &&
      referenceElement &&
      !referenceElement.contains(e.target)
    ) {
      portal.removeChild(referenceElement);
      referenceElement = null;
      document.removeEventListener("click", clickOutsideHandler);
      lastClickedElement = null;
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
  datePicker(referenceElement, (day) => selectDate(day, currentTarget));
}

// Handler para clique no dropdown
function handleDropdownClick(e) {
  e.stopPropagation();

  if (referenceElement && referenceElement.classList.contains("date-picker")) {
    portal.removeChild(referenceElement);
    referenceElement = null;
  }

  // Armazena o elemento clicado
  const currentTarget = e.currentTarget;

  // Fecha o dropdown
  if (referenceElement && lastClickedElement === currentTarget) {
    portal.removeChild(referenceElement);
    referenceElement = null;
    lastClickedElement = null;
    return;
  }

  // Armazena o elemento clicado
  lastClickedElement = currentTarget;

  // Renderiza o dropdown
  if (!referenceElement) {
    referenceElement = dropdown();
    portal.appendChild(referenceElement);
  }

  // Handler para clique fora do dropdown
  const clickOutsideDropdownHandler = (e) => {
    if (
      referenceElement &&
      !referenceElement.contains(e.target) &&
      !currentTarget.contains(e.target)
    ) {
      portal.removeChild(referenceElement);
      referenceElement = null;
      document.removeEventListener("click", clickOutsideDropdownHandler);
      lastClickedElement = null;
    }
  };

  // Adiciona event listener para itens do dropdown
  const hourModal = document.getElementById("hourModal");
  const dropdownItems = referenceElement.querySelectorAll("li");
  dropdownItems.forEach((item) => {
    item.addEventListener("click", () => {
      // Fecha o dropdown ao selecionar um horário
      document.removeEventListener("click", clickOutsideDropdownHandler);
      portal.removeChild(referenceElement);
      referenceElement = null;
      lastClickedElement = null;
      hourModal.textContent = item.textContent;
      hourModal.value = item.textContent;
    });
  });

  document.addEventListener("click", clickOutsideDropdownHandler);

  // Posiciona o dropdown
  positionModal(currentTarget, referenceElement, "below");
}

// Função de seleção de data
function selectDate(day, currentTarget) {
  // Seleciona o input de data
  const displayDate =
    currentTarget.id === "selectDateModal"
      ? document.getElementById("dateModal")
      : document.getElementById("displayDate");

  // Formata a data selecionada
  const selectedDate = dayjs(
    `${new Date().getFullYear()}-${new Date().getMonth() + 1}-${day}`
  ).format("DD/MM/YYYY");
  if (displayDate) {
    displayDate.textContent = selectedDate;
  }
}

openDatePickerButton.addEventListener("click", handleDatePickerClick);
