import IMask from "imask";

export function inputMask() {
  // Seleciona o elemento de input de telefone
  const phoneInput = document.getElementById("phone");

  if (phoneInput) {
    // Define as opções de máscara
    const phoneMask = IMask(phone, {
      mask: "(00) 000-000-000",
    });
  }
}
