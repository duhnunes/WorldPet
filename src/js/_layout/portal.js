import { newScheduleModal } from "./modal/newSchedule";

const portal = document.getElementById("portal");

const newSchedule = document.getElementById("newSchedule");

newSchedule.addEventListener("click", () => {
  const form = newScheduleModal();
  portal.appendChild(form);

  // Handler para o clique fora do modal
  const clickOutsideHandler = (e) => {
    if (!newSchedule.contains(e.target)) {
      portal.removeChild(form);
      document.removeEventListener("click", clickOutsideHandler);
    }
  };

  document.addEventListener("click", clickOutsideHandler);
});
