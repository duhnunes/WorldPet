import dayjs from "dayjs";

// Elementos do DatePicker
export function datePicker(datePickerModalElement, event) {
  const daysContainer = datePickerModalElement.querySelector("#days-container");
  const monthSelected = datePickerModalElement.querySelector(".monthSelected");
  const yearSelected = datePickerModalElement.querySelector(".yearSelected");
  const daysOfWeek = datePickerModalElement.querySelector("#weeks-container");

  // Inicializa o elemento dateModal
  const dateModal = document.getElementById("dateModal");

  function generateDays(month, year) {
    // Limpa os dias anteriores e os dias da semana anteriores
    daysContainer.innerHTML = "";
    daysOfWeek.innerHTML = "";

    // Obtém o número de dias no mês.
    const numDays = dayjs(`${year}-${month + 1}`).daysInMonth();

    // Obtém o dia da semana do primeiro dia do mês.
    const firstDay = dayjs(`${year}-${month + 1}-1`).day();

    // Preencher os dias da semana
    for (let i = 0; i < 7; i++) {
      const weekDay = document.createElement("span");
      weekDay.textContent = dayjs().day(i).format("ddd");
      daysOfWeek.appendChild(weekDay);
    }

    // Preenche os dias do mês anterior até o primeiro dia da semana atual
    const prevMonthDays = dayjs(`${year}-${month}-01`).daysInMonth();
    for (let i = firstDay - 1; i >= 0; i--) {
      const emptyDay = document.createElement("span");
      emptyDay.textContent = prevMonthDays - i;
      emptyDay.classList.add("disabled");
      daysContainer.appendChild(emptyDay);
    }

    // Preenche os dias do mês
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
          selectDate(day);
        });
      }

      daysContainer.appendChild(dayElement);
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

  // Posiciona o DatePicker abaixo do label clicado
  const datepickerHeader = datePickerModalElement.querySelector("header");

  const label = event.currentTarget;

  // Atualiza e gera os dias para o mês e ano atuais
  const today = dayjs();
  const currentMonth = today.month();
  const currentYear = today.year();
  updateMonthYear(currentMonth, currentYear);
  generateDays(currentMonth, currentYear);

  // Fecha o DatePicker ao clicar fora dele e reseta a borda do label
  window.onclick = function (event) {
    if (
      !event.target.closest(".select-date") &&
      !event.target.closest(".date-picker") &&
      !event.target.closest("#selectDateModal")
    ) {
      datePickerModalElement.style.display = "none";
      datepickerHeader.classList.remove("above");
    }
  };

  function selectDate(day) {
    const displayDate = document.getElementById("displayDate");
    const selectedDate = dayjs(
      `${new Date().getFullYear()}-${new Date().getMonth() + 1}-${day}`
    ).format("DD/MM/YYYY");
    if (displayDate) {
      displayDate.textContent = selectedDate;
    }
    if (dateModal) {
      dateModal.textContent = selectedDate;
    }
  }
}
