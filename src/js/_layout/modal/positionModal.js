export function positionModal(
  currentTarget,
  referenceElement,
  position = "below"
) {
  const rect = currentTarget.getBoundingClientRect();
  const isDropdown = referenceElement.classList.contains("dropdown");
  const offset = 185;
  const dropdownOffsetY = 380;
  const dropdownOffsetX = 190;

  if (isDropdown) {
    referenceElement.style.top = `${
      rect.bottom +
      window.scrollY +
      referenceElement.offsetHeight -
      dropdownOffsetY
    }px`;
    referenceElement.style.left = `${
      rect.left +
      window.scrollX +
      referenceElement.offsetWidth -
      dropdownOffsetX
    }px`;
  } else {
    if (position === "above") {
      referenceElement.style.top = `${
        rect.top + window.scrollY - referenceElement.offsetHeight - offset
      }px`;
    } else {
      referenceElement.style.top = `${rect.bottom + window.scrollY + 5}px`;
    }
    referenceElement.style.left = `${rect.left + window.scrollX}px`;
  }
}
