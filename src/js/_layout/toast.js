export function toast(message, boo = "true") {
  const toast = document.createElement("div");
  toast.classList.add("toast-container");

  const title = document.createElement("h2");
  if (boo) {
    toast.style.setProperty("--bg-color", "var(--bg-success)");
    toast.style.setProperty("--border-color", "var(--border-success)");
    toast.style.setProperty("--content-color", "var(--content-success)");
    title.textContent = "Sucesso";
  } else {
    title.textContent = "Erro";
  }

  const msg = document.createElement("p");
  msg.textContent = message;

  toast.append(title, msg);
  const portal = document.getElementById("portal");
  portal.appendChild(toast);

  let removed = false;
  // Clique para fechar
  toast.onclick = () => {
    if (!removed) {
      portal.removeChild(toast);
      removed = true;
    }
  };
  // Some depois de segundos
  setTimeout(() => {
    if (!removed) {
      portal.removeChild(toast);
      removed = true;
    }
  }, 3000);

  return toast;
}
