export function datePickerModal() {
  const modal = document.createElement("div");
  modal.classList.add("date-picker");
  modal.id = "datePickerModal";

  const anim = document.createElement("div");
  anim.classList.add("anim-container");

  // HEADER
  const header = document.createElement("header");

  const spanMonth = document.createElement("span");
  spanMonth.classList.add("monthSelected");
  const spanYear = document.createElement("span");
  spanYear.classList.add("yearSelected");

  header.append(spanMonth, spanYear);

  // BODY MODAL
  const dateContent = document.createElement("section");
  dateContent.classList.add("date-content");
  const weeksContainer = document.createElement("header");
  weeksContainer.id = "weeks-container";
  const daysContainer = document.createElement("article");
  daysContainer.id = "days-container";

  dateContent.append(weeksContainer, daysContainer);

  // MODAL ASSEMBLY
  anim.append(header, dateContent);
  modal.appendChild(anim);

  return modal;
}
