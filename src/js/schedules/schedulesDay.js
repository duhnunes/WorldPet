import dayjs from "dayjs";
import { FetchSchedules } from "../../services/FetchSchedules";
import { showSchedules } from "./showSchedules";

// Seleciona o input de data.
const selectedDate = document.getElementById("displayDate");

// Seleciona todos os elementos com a classe "period".
const periods = {
  morning: document.getElementById("morning"),
  afternoon: document.getElementById("afternoon"),
  night: document.getElementById("night"),
};

export async function SchedulesDay() {
  // Obtém a data do input.
  const date = selectedDate.dataset.date;

  // Busca na API os agendamentos.
  const dailySchedules = await FetchSchedules({ date });

  Object.keys(periods).forEach((key) => {
    const period = periods[key];

    // Remove apenas o <li> que contém "Nada marcado".
    const emptyItem = period.querySelector("li.empty");
    if (emptyItem) {
      period.removeChild(emptyItem);
    }

    // Limpa todos os itens <li> antigos.
    while (period.firstChild) {
      period.removeChild(period.firstChild);
    }

    // Filtra os agendamentos por período.
    const filteredSchedules = dailySchedules.filter((schedule) => {
      const hour = parseInt(dayjs(schedule.when).format("HH"), 10);
      if (key === "morning") return hour < 12;
      if (key === "afternoon") return hour >= 12 && hour < 18;
      if (key === "night") return hour >= 18;
    });

    // Adiciona novos itens.
    if (filteredSchedules.length === 0) {
      const li = document.createElement("li");
      li.textContent = "Nada marcado";
      li.classList.add("empty");
      period.appendChild(li);
    } else {
      showSchedules({ dailySchedules: filteredSchedules, period });
    }
  });
}
