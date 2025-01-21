import { scheduleCancel } from "../../services/scheduleCancel";
import { confirmModal } from "../_layout/modal/confirmModal";
import { toast } from "../_layout/toast";

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
        const isConfirmed = await confirmModal(
          "Tem certeza que deseja cancelar o agendamento?"
        );

        if (!isConfirmed) {
          return;
        }

        // Faz a requisição da API para cancelar.
        await scheduleCancel({ id });

        // Remove o item <li> do DOM.
        item.remove();

        // Verifica se o período está vazio e adiciona o <li> "Nada marcado" se necessário.
        if (!period.querySelector("li")) {
          const li = document.createElement("li");
          li.textContent = "Nada marcado";
          li.classList.add("empty");
          period.appendChild(li);
        }

        toast("Agendamento cancelado com sucesso!", true);
      }
    }
  });
});
