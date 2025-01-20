import { SchedulesDay } from "../schedules/schedulesDay";

const selectedDate = document.getElementById("displayDate");

selectedDate.onchange = () => {
  SchedulesDay();
};
