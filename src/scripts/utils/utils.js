export const closeModals = () => {
  const modalElements = document.querySelectorAll(".modal");
  modalElements.forEach((element) => {
    element.classList.remove("is-active");
  });
};

export const listenToClickOnCloseModalButtonsAndOnModalBackground = () => {
  const closeModalButtonElements = document.querySelectorAll(".close");
  closeModalButtonElements.forEach((element) => {
    element.addEventListener("click", closeModals);
  });

  const modalBackgroundElements =
    document.querySelectorAll(".modal-background");
  modalBackgroundElements.forEach((element) => {
    element.addEventListener("click", closeModals);
  });
};

export const generateRandomId = () => {
  const randomId = Math.floor(Math.random() * 100).toString();
  return randomId;
};
