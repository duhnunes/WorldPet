import dayjs from "dayjs";

// Elementos do DatePicker
const datePicker = document.getElementById("datePicker");
const datePickerModal = document.getElementById("datePickerModal");
const daysContainer = document.getElementById("days-container");
const monthSelected = document.querySelector(".monthSelected");
const yearSelected = document.querySelector(".yearSelected");
const daysOfWeek = document.getElementById("weeks-container");

const displayDate = document.getElementById("displayDate");
displayDate.textContent = dayjs().format("DD/MM/YYYY");
displayDate.value = dayjs().format("DD/MM/YYYY");

// Elemento do ModalSelectDate
const selectDateModal = document.getElementById("selectDateModal");
const dateModal = document.getElementById("dateModal");
dateModal.textContent = dayjs().format("DD/MM/YYYY");
dateModal.value = dayjs().format("DD/MM/YYYY");

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
  monthSelected.textContent = months.format("MMMM");
  yearSelected.textContent = year;
}

// Posiciona o DatePicker abaixo do label clicado
function positionDatePicker(label, position = "below") {
  const rect = label.getBoundingClientRect();
  const offset = 210;
  if (position === "above") {
    datePickerModal.style.top = `${
      rect.top + window.scrollY - datePickerModal.offsetHeight - offset
    }px`;
  } else {
    datePickerModal.style.top = `${rect.bottom + window.scrollY + 5}px`;
  }
  datePickerModal.style.left = `${rect.left + window.scrollX}px`;
}

const datepickerHeader = document.querySelector(".date-picker header");
function openDatePicker(event) {
  const label = event.currentTarget;

  // Posiciona o DatePicker acima ou abaixo do elemento clicado
  if (label.id === "selectDateModal") {
    positionDatePicker(label, "above");
    datePickerModal.style.flexDirection = "column-reverse";
    datepickerHeader.classList.add("above");
  } else {
    positionDatePicker(label);
    datePickerModal.style.flexDirection = "column";
  }

  datePickerModal.style.display = "flex";

  // Altera a borda diretamente
  label.style.borderColor = "var(--bg-brand)";

  // Atualiza e gera os dias para o mês e ano atuais
  const today = dayjs();
  const currentMonth = today.month();
  const currentYear = today.year();
  updateMonthYear(currentMonth, currentYear);
  generateDays(currentMonth, currentYear);
}

datePicker.addEventListener("click", openDatePicker);
selectDateModal.addEventListener("click", openDatePicker);

// Fecha o DatePicker ao clicar fora dele e reseta a borda do label
window.onclick = function (event) {
  if (
    !event.target.closest(".select-date") &&
    !event.target.closest(".date-picker") &&
    !event.target.closest("#selectDateModal")
  ) {
    datePickerModal.style.display = "none";
    datePicker.style.borderColor = "";
    datepickerHeader.classList.remove("above");
  }
};

function selectDate(day) {
  const selectedDate = dayjs(
    `${new Date().getFullYear()}-${new Date().getMonth() + 1}-${day}`
  ).format("DD/MM/YYYY");
  displayDate.textContent = selectedDate;
  dateModal.textContent = selectedDate;
  datePickerModal.style.display = "none";
  datePicker.style.borderColor = "";
}
