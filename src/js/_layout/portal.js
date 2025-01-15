import { newScheduleModal } from "./modal/newSchedule";
import { datePickerModal } from "./modal/datePickerModal";
import { positionDatePicker } from "./modal/positionDatePicker";
import { datePicker } from "./datepicker";

const portal = document.getElementById("portal");

const newSchedule = document.getElementById("newSchedule");
const openDatePickerButton = document.getElementById("datePicker");

let datePickerModalElement;
let datepickerHeader;

newSchedule.addEventListener("click", () => {
  const form = newScheduleModal();
  portal.appendChild(form);

  // Handler para o clique fora do modal
  const clickOutsideHandler = (e) => {
    if (!newSchedule.contains(e.target) && !form.contains(e.target)) {
      portal.removeChild(form);
      document.removeEventListener("click", clickOutsideHandler);
    }
  };

  document.addEventListener("click", clickOutsideHandler);
});

openDatePickerButton.addEventListener("click", (e) => {
  e.stopPropagation();

  if (!datePickerModalElement) {
    console.log("Criando datePickerModal");
    datePickerModalElement = datePickerModal();
    datepickerHeader = datePickerModalElement.querySelector("header");
    portal.appendChild(datePickerModalElement);
  } else {
    datePickerModalElement.style.display = "block";
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
    }
  };

  document.addEventListener("click", clickOutsideHandler);

  const label = e.currentTarget;

  // Posiciona o DatePicker acima ou abaixo do elemento clicado
  if (label.id === "selectDateModal") {
    positionDatePicker(label, datePickerModalElement, "above");
    datePickerModalElement.style.flexDirection = "column-reverse";
    datepickerHeader.classList.add("above");
  } else {
    positionDatePicker(label, datePickerModalElement);
    datePickerModalElement.style.flexDirection = "column";
  }

  // Inicializa o conteúdo do datePicker
  datePicker(datePickerModalElement, e);
});
