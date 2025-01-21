import dayjs from "dayjs";
import { portal } from "./portal";
import { SchedulesDay } from "../schedules/schedulesDay";

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
  ).format("YYYY-MM-DD");
  if (displayDate) {
    displayDate.textContent = dayjs(selectedDate).format("DD/MM/YYYY");
    displayDate.dataset.date = selectedDate;
    SchedulesDay();
  }

  // Fecha o datePickerModal
  const dateModal = document.getElementById("datePickerModal");
  if (dateModal) {
    portal.removeChild(dateModal);
    referenceElement = null;
    lastClickedElement = null;
  }
}
