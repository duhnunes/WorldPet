import dayjs from "dayjs";
import { portal } from "./portal";

let referenceElement = null;
let lastClickedElement = null;

export function selectDate(day, currentTarget) {
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

  // Fecha o datePickerModal
  const dateModal = document.getElementById("datePickerModal");
  if (dateModal) {
    portal.removeChild(dateModal);
    referenceElement = null;
    lastClickedElement = null;
  }
}
