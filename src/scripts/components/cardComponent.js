const openAddCardModal = () => {
  const addCardModalElement = document.querySelector("#add-card-modal");
  addCardModalElement.classList.add("is-active");
};

export const listenToClickOnOpenAddCardModalButton = () => {
  const openAddCardModalButtonElement = document.querySelector(
    `[slot="add-card-button"]`
  );
  openAddCardModalButtonElement.addEventListener("click", openAddCardModal);
};
