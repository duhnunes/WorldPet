import { scheduleCancel } from "../../services/scheduleCancel";
import { confirmModal } from "../_layout/modal/confirmModal";
import { SchedulesDay } from "./schedulesDay";

const periods = document.querySelectorAll(".period");

periods.forEach((period) => {
  // Captura o evento de clique na lista.
  period.addEventListener("click", async (e) => {
    if (e.target.id === "cancel") {
      // Obtém o li pai do elemento clicado.
      const item = e.target.closest("li");

      // Pega o id do agendamento para remover.
      const { id } = item.dataset;

      // Confirma que o id foi selecionado.
      if (id) {
        // Confirma se o usuário quer cancelar
        const isConfirm = confirmModal(
          "Tem certeza que deseja cancelar o agendamento?"
        );

        if (isConfirm) {
          // Faz a requisição da API para cancelar.
          await scheduleCancel({ id });

          // Recarrega os agendamentos.
          SchedulesDay();
        }
      }
    }
  });
});
