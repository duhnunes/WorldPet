import dayjs from "dayjs";
import { FetchSchedules } from "./FetchSchedules";
import { apiConfig } from "./apiConfig";

export async function AutoDeleteSchedules() {
  const now = dayjs();
  const schedules = await FetchSchedules({ date: now.format("YYYY-MM-DD") });
  const currentHour = now.format("HH:mm");

  schedules.forEach(async (schedule) => {
    const scheduleTime = dayjs(schedule.when).format("HH:mm");
    if (scheduleTime < currentHour) {
      await fetch(`${apiConfig.baseURL}/schedules/${schedule.id}`, {
        method: "DELETE",
      });
    }
  });
}
