const closeModals = () => {
  const modalElement = document.querySelector(".modal");
  modalElement.classList.remove("is-active");
};

export const listenToClickOnCloseModalButtonsAndOnModalBackground = () => {
  const closeModalButtonElements = document.querySelectorAll(".close");
  closeModalButtonElements.forEach((element) => {
    element.addEventListener("click", closeModals);
  });

  const modalBackgroundElement = document.querySelector(".modal-background");
  modalBackgroundElement.addEventListener("click", closeModals);
};
