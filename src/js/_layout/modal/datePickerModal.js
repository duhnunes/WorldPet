export function datePickerModal() {
  const modal = document.createElement("div");
  modal.classList.add("date-picker");
  modal.id = "datePickerModal";

  // HEADER
  const header = document.createElement("header");
  const iconArrowLeft = document.createElement("i");
  iconArrowLeft.classList.add("arrow-down", "rotate-left");

  const divMonthYear = document.createElement("div");
  const spanMonth = document.createElement("span");
  spanMonth.classList.add("monthSelected");
  const spanYear = document.createElement("span");
  spanYear.classList.add("yearSelected");

  const iconArrowRight = document.createElement("i");
  iconArrowRight.classList.add("arrow-down", "rotate-right");

  divMonthYear.append(spanMonth, spanYear);
  header.append(iconArrowLeft, divMonthYear, iconArrowRight);

  // BODY MODAL
  const dateContent = document.createElement("section");
  dateContent.classList.add("date-content");
  const weeksContainer = document.createElement("header");
  weeksContainer.id = "weeks-container";
  const daysContainer = document.createElement("article");
  daysContainer.id = "days-container";

  dateContent.append(weeksContainer, daysContainer);

  // MODAL ASSEMBLY
  modal.append(header, dateContent);

  return modal;
}
