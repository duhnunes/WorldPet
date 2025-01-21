import dayjs from "dayjs";
import { toast } from "../_layout/toast";

export function showSchedules({ dailySchedules, period }) {
  try {
    // Limpa os agendamentos anteriores do período específico
    period.innerHTML = "";

    // Renderiza os agendamentos por período.
    dailySchedules.forEach((schedule) => {
      const item = document.createElement("li");
      item.classList.add("client-content");
      item.dataset.id = schedule.id;

      // Formata a hora e a data
      const formattedTime = dayjs(schedule.when).format("HH:mm");

      const hourSpan = document.createElement("span");
      hourSpan.classList.add("hour");
      hourSpan.textContent = formattedTime;

      const divClientDay = document.createElement("div");
      divClientDay.classList.add("client-day");
      const day = document.createElement("span");
      day.classList.add("day");
      day.textContent = schedule.pet;

      const slash = document.createElement("span");
      slash.textContent = "/";
      const clientName = document.createElement("span");
      clientName.classList.add("client");
      clientName.textContent = schedule.client;
      divClientDay.append(day, slash, clientName);

      const typeService = document.createElement("span");
      typeService.classList.add("type");
      typeService.textContent = schedule.service;

      const removeBtn = document.createElement("button");
      removeBtn.type = "button";
      removeBtn.id = "cancel";
      removeBtn.dataset.variant = "link";
      removeBtn.textContent = "Remover agendamento";

      // Cria o item de agendamento
      item.append(hourSpan, divClientDay, typeService, removeBtn);

      // Renderiza o agendamento no período correspondente
      period.appendChild(item);
    });
  } catch (error) {
    console.error(error);
    toast(
      "Não foi possível exibir os agendamentos. Verifique o console para mais informações.",
      false
    );
  }
}
