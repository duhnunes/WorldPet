import { closeOpenModals } from "../portal";

export function confirmModal(message) {
  return new Promise((resolve) => {
    const modal = document.createElement("div");
    modal.classList.add("modal-base");
    modal.id = "errorMsgModal";

    const form = document.createElement("form");
    form.classList.add("modal-container");

    const header = document.createElement("header");

    const title = document.createElement("h2");
    title.textContent = "Error";
    const description = document.createElement("p");
    description.textContent = message;

    header.append(title, description);

    // Botões
    const divBtn = document.createElement("div");
    divBtn.classList.add("btn-container");
    const confirmBtn = document.createElement("button");
    confirmBtn.type = "button";
    confirmBtn.dataset.variant = "confirm";
    confirmBtn.id = "confirm";
    confirmBtn.classList.add("confirm-delete");
    confirmBtn.textContent = "Confirmar";
    const cancelBtn = document.createElement("button");
    cancelBtn.type = "button";
    cancelBtn.dataset.variant = "cancel";
    cancelBtn.id = "cancel";
    cancelBtn.classList.add("cancel");
    cancelBtn.textContent = "Cancelar";

    divBtn.append(confirmBtn, cancelBtn);
    // Montar Modal
    modal.appendChild(form);
    form.append(header, divBtn);

    const portal = document.getElementById("portal");
    portal.appendChild(modal);

    // Clique para deletar
    confirmBtn.onclick = () => {
      closeOpenModals("errorMsgModal");
      resolve(true);
    };
    cancelBtn.onclick = () => {
      closeOpenModals("errorMsgModal");
      resolve(false);
    };
  });
}
