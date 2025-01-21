import dayjs from "dayjs";
import { createSchedule } from "../schedules/createSchedule";
import { SchedulesDay } from "../schedules/schedulesDay";
import { closeOpenModals } from "../_layout/portal";
import { toast } from "../_layout/toast";

export function formSubmit() {
  const form = document.querySelector("form");
  const clientName = document.getElementById("clientName");
  const petName = document.getElementById("petName");
  const phone = document.getElementById("phone");
  const serviceDescription = document.getElementById("descriptionService");
  const date = document.getElementById("dateModal");
  const hourModal = document.getElementById("hourModal");

  form.onsubmit = async (e) => {
    e.preventDefault();

    try {
      const id = new Date().getTime().toString();

      const client = clientName.value.trim();
      const pet = petName.value.trim();
      const tel = phone.value.replace(/\D/g, "");
      const service = serviceDescription.value;

      const dateValue = date.textContent.trim();
      const timeValue = hourModal.value ? hourModal.value.trim() : null;

      if (!dateValue || !timeValue) {
        throw new Error("Data ou hora não foram selecionadas corretamente.");
      }

      const [day, month, year] = dateValue.split("/");
      const formattedDate = `${year}-${month}-${day}`;
      const combinedDateTime = `${formattedDate} ${timeValue}`;

      // Converte a data e hora para um objeto dayjs
      const when = dayjs(combinedDateTime, "YYYY-MM-DD HH:mm");

      if (when.isValid()) {
        const whenISOString = when.toISOString();
        const scheduleData = {
          id,
          client,
          pet,
          tel,
          service,
          when: whenISOString,
        };

        await createSchedule(scheduleData);
        await SchedulesDay();

        form.reset();
        closeOpenModals("newScheduleFormModal");
      } else {
        throw new Error("Combinação de data/hora inválida.");
      }
    } catch (error) {
      console.error("Erro:", error);
      toast(
        "Houve um erro ao agendar. Verifique o console para mais informações.",
        false
      );
    }
  };
}
