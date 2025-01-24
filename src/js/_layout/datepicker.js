import dayjs from "dayjs";

// Elementos do DatePicker
const displayDate = document.getElementById("displayDate");
displayDate.value = dayjs().format("DD/MM/YYYY");
displayDate.textContent = dayjs().format("DD/MM/YYYY");

export function datePicker(datePickerModalElement, onSelectDate) {
  const daysContainer = datePickerModalElement.querySelector("#days-container");
  const monthSelected = datePickerModalElement.querySelector(".monthSelected");
  const yearSelected = datePickerModalElement.querySelector(".yearSelected");
  const daysOfWeek = datePickerModalElement.querySelector("#weeks-container");

  function generateDays(month, year) {
    // Limpa os elementos
    daysOfWeek.innerHTML = "";
    daysContainer.innerHTML = "";

    // Pega o total de dias do mês
    const numDays = dayjs(`${year}-${month + 1}`).daysInMonth();
    const firstDay = dayjs(`${year}-${month + 1}-1`).day();

    // Adiciona os dias da semana
    for (let i = 0; i < 7; i++) {
      const weekDay = document.createElement("span");
      weekDay.textContent = dayjs().day(i).format("ddd");
      daysOfWeek.appendChild(weekDay);
    }

    // Adiciona dias do final do mês passado
    const prevMonthDays = dayjs(`${year}-${month}-01`).daysInMonth();
    for (let i = firstDay - 1; i >= 0; i--) {
      const emptyDay = document.createElement("span");
      emptyDay.textContent = prevMonthDays - i;
      emptyDay.classList.add("day");
      emptyDay.classList.add("disabled");
      daysContainer.appendChild(emptyDay);
    }

    const today = dayjs();
    for (let day = 1; day <= numDays; day++) {
      const dayElement = document.createElement("span");
      dayElement.textContent = day;
      dayElement.classList.add("day");

      const isPastDate = dayjs(`${year}-${month + 1}-${day}`).isBefore(
        today,
        "day"
      );
      if (isPastDate) {
        dayElement.classList.add("disabled");
      } else {
        dayElement.addEventListener("click", () => {
          datePickerModalElement.classList.add("closeDatePicker");
          datePickerModalElement.addEventListener("animationend", () => {
            onSelectDate(day);
          });
        });
      }

      daysContainer.appendChild(dayElement);
    }

    // Adiciona dias do início do próximo mês
    const totalCells = daysContainer.children.length;
    const remainingCells = 42 - totalCells;
    for (let i = 1; i <= remainingCells; i++) {
      const nextMonthDay = document.createElement("span");
      nextMonthDay.textContent = i;
      nextMonthDay.classList.add("day");
      nextMonthDay.classList.add("disabled");
      daysContainer.appendChild(nextMonthDay);
    }
  }

  function updateMonthYear(month, year) {
    const months = dayjs().month(month);
    if (monthSelected) {
      monthSelected.textContent = months.format("MMMM");
    }
    if (yearSelected) {
      yearSelected.textContent = year;
    }
  }

  const today = dayjs();
  const currentMonth = today.month();
  const currentYear = today.year();
  updateMonthYear(currentMonth, currentYear);
  generateDays(currentMonth, currentYear);
}
