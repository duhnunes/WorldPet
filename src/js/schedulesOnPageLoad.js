import { AutoDeleteSchedules } from "../services/autoDeleteSchedure";
import { SchedulesDay } from "./schedules/schedulesDay";

document.addEventListener("DOMContentLoaded", () => {
  SchedulesDay();
  AutoDeleteSchedules();

  setInterval(() => {
    AutoDeleteSchedules();
  }, 60000);
});
