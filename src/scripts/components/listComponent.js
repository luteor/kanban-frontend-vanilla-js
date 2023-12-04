import { closeModals } from "../utils/utils";

const openAddListModal = () => {
  const addListModalElement = document.querySelector("#add-list-modal");
  addListModalElement.classList.add("is-active");
};

export const listenToClickOnOpenAddListModalButton = () => {
  const openAddListModalButtonElement =
    document.querySelector("#add-list-button");
  openAddListModalButtonElement.addEventListener("click", openAddListModal);
};

const addListToListsContainer = () => {};

export const listenToSubmitOnAddListForm = () => {
  const addListFormElement = document.querySelector(".modal-card form");

  addListFormElement.addEventListener("submit", (event) => {
    event.preventDefault();

    const formData = new FormData(addListFormElement);
    console.log(Object.fromEntries(formData));

    addListFormElement.reset();

    addListToListsContainer(formData);

    closeModals();
  });
};
