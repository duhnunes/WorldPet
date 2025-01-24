import dayjs from "dayjs";

import { newScheduleModal } from "./modal/newScheduleModal";
import { datePickerModal } from "./modal/datePickerModal";
import { positionModal } from "./modal/positionModal";
import { datePicker } from "./datepicker";
import { dropdown } from "./dropdown";
import { formSubmit } from "../form/submit";
import { inputMask } from "./inputMask";
import { selectDate } from "./selectDate";
import { HoursAvailable } from "../form/hoursAvailable";
import { FetchSchedules } from "../../services/FetchSchedules";

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
  form.id = "newScheduleFormModal";
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

  if (!dateModal.dataset.date) {
    const today = dayjs().format("YYYY-MM-DD");
    dateModal.dataset.date = today;
    dateModal.textContent = dayjs(today).format("DD/MM/YYYY");
  }

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
        referenceElement.classList.add("closeDatePicker");
        referenceElement.addEventListener(
          "animationend",
          () => {
            portal.removeChild(referenceElement);
            referenceElement = null;
            document.removeEventListener("click", clickOutsideHandler);
            lastClickedElement = null;
          },
          { once: true }
        );
      }
    }
  };

  document.addEventListener("click", clickOutsideHandler);

  // Posiciona o datePickerModal
  if (currentTarget.id === "selectDateModal") {
    const insideDiv = referenceElement.querySelector(".anim-container");
    positionModal(currentTarget, referenceElement, "above");
    referenceElement.classList.add("above");
    insideDiv.style.flexDirection = "column-reverse";
    datepickerHeader.classList.add("above");
  } else {
    positionModal(currentTarget, referenceElement);
  }

  // Passa a função de seleção de data como parâmetro
  datePicker(referenceElement, (day) => selectDate(day, currentTarget, portal));
}

// Handler para clique no dropdown
async function handleDropdownClick(e) {
  e.stopPropagation();
  const currentTarget = e.currentTarget;

  closeOpenModals();
  lastClickedElement = currentTarget;

  // Seleciona a data e busca os agendamentos do dia
  const date = document.getElementById("dateModal").dataset.date;
  const dailySchedules = await FetchSchedules({ date });

  // Renderiza o dropdown
  referenceElement = dropdown();
  portal.appendChild(referenceElement);

  // Obtém o container para os horários disponíveis
  const hoursContainer = referenceElement.querySelector("#hours");

  // Chama HoursAvailable para obter e renderizar os horários disponíveis
  HoursAvailable({ date, dailySchedules, container: hoursContainer });

  const clickOutsideDropdownHandler = (e) => {
    if (
      referenceElement &&
      !referenceElement.contains(e.target) &&
      !currentTarget.contains(e.target)
    ) {
      if (portal.contains(referenceElement)) {
        referenceElement.classList.add("closeDropdown");

        referenceElement.addEventListener(
          "animationend",
          () => {
            portal.removeChild(referenceElement);
            referenceElement = null;
            document.removeEventListener("click", clickOutsideDropdownHandler);
            lastClickedElement = null;
          },
          { once: true }
        );
      }
    }
  };

  document.addEventListener("click", clickOutsideDropdownHandler);

  const hourModal = document.getElementById("hourModal");
  const dropdownItems = referenceElement.querySelectorAll("li");
  dropdownItems.forEach((item) => {
    item.addEventListener("click", () => {
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

  positionModal(currentTarget, referenceElement, "below");
}

openDatePickerButton.addEventListener("click", handleDatePickerClick);

export function closeOpenModals(modalId = null) {
  if (modalId) {
    const modalToClose = document.getElementById(modalId);
    if (modalToClose && portal.contains(modalToClose)) {
      portal.removeChild(modalToClose);
    }
  } else if (referenceElement && portal.contains(referenceElement)) {
    portal.removeChild(referenceElement);
    referenceElement = null;
    lastClickedElement = null;
  }
}
