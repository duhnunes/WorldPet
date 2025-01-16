import { newScheduleModal } from "./modal/newSchedule";
import { datePickerModal } from "./modal/datePickerModal";
import { positionDatePicker } from "./modal/positionDatePicker";
import { datePicker } from "./datepicker";
import dayjs from "dayjs";

const portal = document.getElementById("portal");

const newSchedule = document.getElementById("newSchedule");
const openDatePickerButton = document.getElementById("datePicker");

let selectDateModal;
let datePickerModalElement;
let datepickerHeader;
let lastClickedElement;

newSchedule.addEventListener("click", () => {
  const form = newScheduleModal();
  portal.appendChild(form);

  selectDateModal = document.getElementById("selectDateModal");
  const dateModal = document.getElementById("dateModal");
  if (selectDateModal) {
    selectDateModal.addEventListener("click", handleDatePickerClick);
  }
  dateModal.textContent = dayjs().format("DD/MM/YYYY");

  const clickOutsideHandler = (e) => {
    if (
      !newSchedule.contains(e.target) &&
      !form.contains(e.target) &&
      !selectDateModal
    ) {
      portal.removeChild(form);
      document.removeEventListener("click", clickOutsideHandler);
    }
  };

  document.addEventListener("click", clickOutsideHandler);
});

function handleDatePickerClick(e) {
  e.stopPropagation();

  const currentTarget = e.currentTarget;

  if (datePickerModalElement && lastClickedElement === currentTarget) {
    console.log("Removendo datePickerModal");
    portal.removeChild(datePickerModalElement);
    datePickerModalElement = null;
    lastClickedElement = null;
    return;
  }

  lastClickedElement = currentTarget;

  if (!datePickerModalElement) {
    datePickerModalElement = datePickerModal();
    datepickerHeader = datePickerModalElement.querySelector("header");
    portal.appendChild(datePickerModalElement);
  }

  const clickOutsideHandler = (e) => {
    if (
      openDatePickerButton &&
      !openDatePickerButton.contains(e.target) &&
      datePickerModalElement &&
      !datePickerModalElement.contains(e.target)
    ) {
      console.log("Removendo datePickerModal");
      portal.removeChild(datePickerModalElement);
      datePickerModalElement = null;
      document.removeEventListener("click", clickOutsideHandler);
      lastClickedElement = null;
    }
  };

  document.addEventListener("click", clickOutsideHandler);

  if (currentTarget.id === "selectDateModal") {
    positionDatePicker(currentTarget, datePickerModalElement, "above");
    datePickerModalElement.style.display = "flex";
    datePickerModalElement.style.flexDirection = "column-reverse";
    datepickerHeader.classList.add("above");
  } else {
    positionDatePicker(currentTarget, datePickerModalElement);
    datePickerModalElement.style.display = "flex";
    datePickerModalElement.style.flexDirection = "column";
  }

  // Passa a função de seleção de data como parâmetro
  datePicker(datePickerModalElement, (day) => selectDate(day, currentTarget));
}

function selectDate(day, currentTarget) {
  const displayDate =
    currentTarget.id === "selectDateModal"
      ? document.getElementById("dateModal")
      : document.getElementById("displayDate");

  const selectedDate = dayjs(
    `${new Date().getFullYear()}-${new Date().getMonth() + 1}-${day}`
  ).format("DD/MM/YYYY");
  if (displayDate) {
    displayDate.textContent = selectedDate;
  }
}

openDatePickerButton.addEventListener("click", handleDatePickerClick);
