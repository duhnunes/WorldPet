export function newScheduleModal() {
  // MODAL
  const modal = document.createElement("div");
  modal.classList.add("modal-base");
  modal.id = "scheduleModal";

  const form = document.createElement("form");
  form.classList.add("modal-container");

  const header = document.createElement("header");
  const iconClose = document.createElement("i");
  iconClose.classList.add("close");
  const title = document.createElement("h2");
  title.textContent = "Agende um atendimento";
  const description = document.createElement("p");
  description.textContent =
    "Preencha os dados do cliente para realizar o agendamento:";

  header.append(iconClose, title, description);

  // MODAL CONTENT
  const modalContent = document.createElement("section");
  modalContent.classList.add("modal-content");

  // FIRST SECTION LABEL
  const labelTutorName = document.createElement("label");
  const spanTutorName = document.createElement("span");
  spanTutorName.textContent = "Nome do Tutor";

  const divTutorName = document.createElement("div");
  divTutorName.classList.add("input-box");
  const iconUser = document.createElement("i");
  iconUser.classList.add("user");
  const inputTutorName = document.createElement("input");
  inputTutorName.type = "text";
  inputTutorName.id = "clientName";
  inputTutorName.placeholder = "Digite seu nome";

  divTutorName.append(iconUser, inputTutorName);
  labelTutorName.append(spanTutorName, divTutorName);

  // SECOND SECTION LABEL
  const labelPetName = document.createElement("label");
  const spanPetName = document.createElement("span");
  spanPetName.textContent = "Nome do Pet";

  const divPetName = document.createElement("div");
  divPetName.classList.add("input-box");
  const iconPet = document.createElement("i");
  iconPet.classList.add("pet-paw");
  const inputPetName = document.createElement("input");
  inputPetName.type = "text";
  inputPetName.id = "petName";
  inputPetName.placeholder = "Digite o nome do seu pet";

  divPetName.append(iconPet, inputPetName);
  labelPetName.append(spanPetName, divPetName);

  // THIRD SECTION LABEL
  const labelPhone = document.createElement("label");
  const spanPhone = document.createElement("span");
  spanPhone.textContent = "Telefone";

  const divPhone = document.createElement("div");
  divPhone.classList.add("input-box");
  const iconPhone = document.createElement("i");
  iconPhone.classList.add("phone");
  const inputPhone = document.createElement("input");
  inputPhone.type = "tel";
  inputPhone.id = "phone";
  inputPhone.placeholder = "(00) 000-000-000";
  inputPhone.maxLength = "16";

  divPhone.append(iconPhone, inputPhone);
  labelPhone.append(spanPhone, divPhone);

  // FOURTH SECTION LABEL
  const labelDescription = document.createElement("label");
  const spanDescription = document.createElement("span");
  spanDescription.textContent = "Descrição do serviço";
  const textareaDescription = document.createElement("textarea");
  textareaDescription.id = "descriptionService";
  textareaDescription.placeholder = "Banho e tosa";

  labelDescription.append(spanDescription, textareaDescription);

  // FIFTH SECTION LABEL
  const divDateHour = document.createElement("div");
  divDateHour.classList.add("date-hour");

  const labelDate = document.createElement("label");
  const spanData = document.createElement("span");
  spanData.textContent = "Data";
  const divSelectDateModal = document.createElement("div");
  divSelectDateModal.classList.add("input-box");
  divSelectDateModal.id = "selectDateModal";
  const iconCalendar = document.createElement("i");
  iconCalendar.classList.add("calendar");
  const spanDateModal = document.createElement("span");
  spanDateModal.id = "dateModal";
  spanDateModal.textContent = "dd/mm/yyyy";
  const iconArrowDown = document.createElement("i");
  iconArrowDown.classList.add("arrow-down");

  labelDate.append(spanData, divSelectDateModal);
  divSelectDateModal.append(iconCalendar, spanDateModal, iconArrowDown);

  const labelHour = document.createElement("label");
  const spanHour = document.createElement("span");
  spanHour.textContent = "Hora";
  const divInputBox = document.createElement("div");
  divInputBox.classList.add("input-box");
  divInputBox.id = "selectHourModal";
  const iconClock = document.createElement("i");
  iconClock.classList.add("clock");
  const spanHourDecimal = document.createElement("span");
  spanHourDecimal.id = "hourModal";
  spanHourDecimal.textContent = "12:00";
  const iconArrowDown2 = document.createElement("i");
  iconArrowDown2.classList.add("arrow-down");

  divInputBox.append(iconClock, spanHourDecimal, iconArrowDown2);
  labelHour.append(spanHour, divInputBox);

  divDateHour.append(labelDate, labelHour);

  modalContent.append(
    labelTutorName,
    labelPetName,
    labelPhone,
    labelDescription,
    divDateHour
  );

  // MODAL FOOTER
  const buttonAdd = document.createElement("button");
  buttonAdd.type = "submit";
  buttonAdd.dataset.variant = "primary";
  buttonAdd.textContent = "Agendar";

  // MODAL Assembly
  form.append(header, modalContent, buttonAdd);
  modal.append(form);

  return modal;
}
