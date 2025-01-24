import dayjs from "dayjs";
import { createSchedule } from "../schedules/createSchedule";
import { SchedulesDay } from "../schedules/schedulesDay";
import { closeOpenModals } from "../_layout/portal";
import { toast } from "../_layout/toast";
import { AutoDeleteSchedules } from "../../services/autoDeleteSchedure";

export function formSubmit() {
  const form = document.querySelector("form");
  const clientName = document.getElementById("clientName");
  const petName = document.getElementById("petName");
  const phone = document.getElementById("phone");
  const serviceDescription = document.getElementById("descriptionService");
  const date = document.getElementById("dateModal");
  const hourModal = document.getElementById("hourModal");

  // Função para remover a classe "required" quando o usuário começar a digitar
  const removeRequiredClass = (inputBox) => {
    const input =
      inputBox.querySelector("input") || inputBox.querySelector("textarea");
    if (input) {
      input.addEventListener("input", () => {
        inputBox.classList.remove("required");
        if (input.tagName.toLowerCase() === "textarea") {
          input.classList.remove("required");
        }
      });
    }
  };

  form.querySelectorAll(".input-box").forEach(removeRequiredClass);

  // Adiciona a função diretamente ao textarea
  if (serviceDescription) {
    serviceDescription.addEventListener("input", () => {
      serviceDescription.classList.remove("required");
    });
  }

  form.onsubmit = async (e) => {
    e.preventDefault();

    try {
      const client = clientName.value.trim();
      const pet = petName.value.trim();
      const tel = phone.value.replace(/\D/g, "");
      const service = serviceDescription.value.trim();
      const timeValue = hourModal.value ? hourModal.value.trim() : null;

      // Validação dos campos (excluindo a data)
      if (!client || !pet || !tel || !service || !timeValue) {
        form.querySelectorAll(".input-box").forEach((inputBox) => {
          // Verifica se o input-box contém um elemento com o ID dateModal
          if (inputBox.querySelector("#dateModal")) {
            return;
          }

          const input =
            inputBox.querySelector("input") ||
            inputBox.querySelector("textarea");
          if (!input || !input.value.trim()) {
            inputBox.classList.add("required");
            if (input && input.tagName.toLowerCase() === "textarea") {
              input.classList.add("required");
            }
          } else {
            inputBox.classList.remove("required");
            if (input && input.tagName.toLowerCase() === "textarea") {
              input.classList.remove("required");
            }
          }
        });

        // Adiciona a classe "required" diretamente ao textarea se necessário
        if (!serviceDescription.value.trim()) {
          serviceDescription.classList.add("required");
        } else {
          serviceDescription.classList.remove("required");
        }

        // Foca no primeiro campo com a classe "required"
        const firstRequired = form.querySelector(
          ".input-box.required, textarea.required"
        );
        if (firstRequired) {
          const firstInput =
            firstRequired.querySelector("input") ||
            firstRequired.querySelector("textarea") ||
            firstRequired;
          if (firstInput) {
            firstInput.focus();
          }
        }

        toast("Por favor, preencha todos os campos obrigatórios.", false);
        return;
      }

      const id = new Date().getTime().toString();
      const dateValue = date.textContent.trim();
      const [day, month, year] = dateValue.split("/");
      const formattedDate = `${year}-${month}-${day}`;
      const combinedDateTime = `${formattedDate} ${timeValue}`;
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
        await AutoDeleteSchedules();

        form.reset();
        closeOpenModals("newScheduleFormModal");
      } else {
        throw new Error("Combinação de data/hora inválida.");
      }
    } catch (error) {
      console.error("Erro:", error);
    }
  };
}
