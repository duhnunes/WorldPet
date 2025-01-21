import { apiConfig } from "../../services/apiConfig.js";
import { toast } from "../_layout/toast.js";

export async function createSchedule(scheduleData) {
  try {
    await fetch(`${apiConfig.baseURL}/schedules`, {
      method: "POST",
      header: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(scheduleData),
    });
  } catch (error) {
    console.error(error);
    toast(
      "Não foi possível agendar. Verifique o console para mais informações.",
      false
    );
  }
}
