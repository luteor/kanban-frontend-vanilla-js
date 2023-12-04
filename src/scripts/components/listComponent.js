const openAddListModal = () => {
  const addListModalElement = document.querySelector("#add-list-modal");
  addListModalElement.classList.add("is-active");
};

export const listenToSubmitOnOpenListModalButton = () => {
  const addListButtonElement = document.querySelector("#add-list-button");
  addListButtonElement.addEventListener("click", openAddListModal);
};
