import { apiConfig } from "../../services/apiConfig.js";

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
    console.log(error);
    alert("Não foi possível agendar. Tente novamente mais tarde.");
  }
}
