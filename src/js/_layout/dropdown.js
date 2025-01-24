import { openingHours } from "../../utils/openingHours.js";

export function dropdown(availableHour) {
  const dropdown = document.createElement("div");
  dropdown.classList.add("dropdown");
  dropdown.id = "dropdown";

  const insideDiv = document.createElement("div");
  insideDiv.classList.add("content-container");

  const ul = document.createElement("ul");
  ul.id = "hours";
  openingHours.forEach(({ hour, availableHour }) => {
    const li = document.createElement("li");
    li.textContent = hour;
    if (!availableHour) {
      li.classList.add("disabled");
    }
    ul.append(li);
  });

  insideDiv.append(ul);
  dropdown.appendChild(insideDiv);

  return dropdown;
}
