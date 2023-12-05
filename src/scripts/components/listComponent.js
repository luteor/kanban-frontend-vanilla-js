import { closeModals } from "../utils/utils";
import { listenToClickOnOpenAddCardModalButton } from "./cardComponent";

export const openAddListModal = () => {
  const addListModalElement = document.querySelector("#add-list-modal");
  addListModalElement.classList.add("is-active");
};

export const listenToClickOnOpenAddListModalButton = () => {
  const openAddListModalButtonElement =
    document.querySelector("#add-list-button");
  openAddListModalButtonElement.addEventListener("click", openAddListModal);
};

const addListToListsContainer = (addListData) => {
  const listsContainerElement = document.querySelector("#lists-container");

  const listTemplateElement = document.querySelector("#list-template");

  const newListElement = listTemplateElement.content.cloneNode(true);

  newListElement.querySelector(`[slot="list-name"]`).textContent =
    addListData.name;

  listsContainerElement.appendChild(newListElement);
};

export const listenToSubmitOnAddListForm = () => {
  const addListFormElement = document.querySelector(".modal-card form");

  addListFormElement.addEventListener("submit", (event) => {
    event.preventDefault();

    const addListFormData = new FormData(addListFormElement);
    const addListData = Object.fromEntries(addListFormData);

    addListFormElement.reset();

    addListToListsContainer(addListData);

    listenToClickOnOpenAddCardModalButton();

    closeModals();
  });
};
