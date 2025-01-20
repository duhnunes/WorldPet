import { FetchSchedules } from "../../services/FetchSchedules";
import { showSchedules } from "./showSchedules";

// seleciona o input de data.
const selectedDate = document.getElementById("displayDate");

export async function SchedulesDay() {
  // Obtém a data do input;
  const date = selectedDate.dataset.date;

  // Busca na API os agendamentos
  const dailySchedules = await FetchSchedules({ date });

  // Exibe os agendamentos
  showSchedules({ dailySchedules });
}
