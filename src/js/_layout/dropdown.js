import { openingHours } from "../../utils/openingHours.js";

export function dropdown() {
  const dropdown = document.createElement("div");
  dropdown.classList.add("dropdown");
  dropdown.id = "dropdown";

  const ul = document.createElement("ul");
  openingHours.forEach((hour) => {
    const li = document.createElement("li");
    li.textContent = hour;
    ul.append(li);
  });

  dropdown.append(ul);

  return dropdown;
}
