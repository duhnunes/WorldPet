import { toast } from "../js/_layout/toast";
import { apiConfig } from "./apiConfig";

export async function scheduleCancel({ id }) {
  try {
    await fetch(`${apiConfig.baseURL}/schedules/${id}`, {
      method: "DELETE",
    });

    toast("Agendamento cancelado com sucesso!", true);
  } catch (error) {
    console.error(error);
    toast("Não foi possível cancelar o agendamento.", false);
  }
}
