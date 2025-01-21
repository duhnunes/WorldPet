import dayjs from "dayjs";
import { apiConfig } from "./apiConfig";
import { toast } from "../js/_layout/toast";

export async function FetchSchedules({ date }) {
  try {
    // Faz a requisição
    const response = await fetch(`${apiConfig.baseURL}/schedules`);

    // Converte a resposta em JSON
    const data = await response.json();

    // Filtra os agendamentos do dia selecionado.
    const dailySchedules = data.filter((schedule) => {
      return dayjs(schedule.when).isSame(date, "day");
    });

    return dailySchedules;
  } catch (error) {
    console.error(error);
    toast("Não foi possível buscar os agendamentos do dia selecionado.", false);
  }
}
