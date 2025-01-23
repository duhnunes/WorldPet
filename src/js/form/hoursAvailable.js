import dayjs from "dayjs";
import { openingHours } from "../../utils/openingHours.js";

export function HoursAvailable({ date, dailySchedules, container }) {
  // Limpa a lista de horários.
  container.innerHTML = "";

  // Filtra os horários indisponíveis
  const unavailableHours = dailySchedules.map((schedule) => {
    return dayjs(schedule.when).format("HH:mm");
  });

  const opening = openingHours.map((hour) => {
    // Adiciona a hora na data e verifica se está no passado.
    const isHourPast = dayjs().isAfter(
      dayjs(`${date} ${hour}`, "YYYY-MM-DD HH:mm")
    );

    const availableHour = !unavailableHours.includes(hour) && !isHourPast;

    return { hour, availableHour };
  });

  // Renderiza os horários disponíveis.
  opening.forEach(({ hour, availableHour }) => {
    const li = document.createElement("li");
    li.textContent = hour;
    if (!availableHour) {
      li.classList.add("disabled");
    }
    container.appendChild(li);
  });
}
