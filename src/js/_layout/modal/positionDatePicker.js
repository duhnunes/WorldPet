export function positionDatePicker(
  currentTarget,
  datePickerModalElement,
  position = "below"
) {
  const rect = currentTarget.getBoundingClientRect();
  const offset = 165;
  if (position === "above") {
    datePickerModalElement.style.top = `${
      rect.top + window.scrollY - datePickerModalElement.offsetHeight - offset
    }px`;
  } else {
    datePickerModalElement.style.top = `${rect.bottom + window.scrollY + 5}px`;
  }
  datePickerModalElement.style.left = `${rect.left + window.scrollX}px`;
}
