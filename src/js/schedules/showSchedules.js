import dayjs from "dayjs";

const periodMorning = document.getElementById("morning");
const periodAfternoon = document.getElementById("afternoon");
const periodNight = document.getElementById("night");

export function showSchedules({ dailySchedules }) {
  try {
    // Limpa as listas
    periodMorning.innerHTML = "";
    periodAfternoon.innerHTML = "";
    periodNight.innerHTML = "";

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
      const hour = parseInt(dayjs(schedule.when).format("HH"), 10);
      if (hour < 12) {
        periodMorning.appendChild(item);
      } else if (hour >= 12 && hour < 18) {
        periodAfternoon.appendChild(item);
      } else {
        periodNight.appendChild(item);
      }
    });
  } catch (error) {
    console.log(error);
    alert("Não foi possível exibir os agendamentos.");
  }
}
