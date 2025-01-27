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

      // Cria a hora
      const hourSpan = document.createElement("span");
      hourSpan.classList.add("hour");
      hourSpan.textContent = formattedTime;

      // Cria o nome do cliente e do Pet
      const divClientPet = document.createElement("div");
      divClientPet.classList.add("client-pet");
      const pet = document.createElement("span");
      pet.classList.add("pet");
      pet.textContent = schedule.pet;
      const slash = document.createElement("span");
      slash.textContent = "/";
      const clientName = document.createElement("span");
      clientName.classList.add("client");
      clientName.textContent = schedule.client;
      divClientPet.append(pet, slash, clientName);

      // Cria o tipo de serviço
      const typeService = document.createElement("span");
      typeService.classList.add("type");
      typeService.textContent = schedule.service;

      // Cria o botão de remoção
      const removeBtn = document.createElement("button");
      removeBtn.type = "button";
      removeBtn.id = "cancel";
      removeBtn.dataset.variant = "link";
      removeBtn.textContent = "Remover agendamento";

      // Cria o item de agendamento
      const divGlobal = document.createElement("div");
      divGlobal.classList.add("client-container");
      divGlobal.append(hourSpan, divClientPet, typeService);
      item.append(divGlobal, removeBtn);

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
