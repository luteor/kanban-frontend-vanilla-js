import { closeModals, generateRandomId } from "../utils/utils";
import { listenToClickOnOpenAddCardModalButton } from "./cardComponent";

const openAddListModal = () => {
  const addListModalElement = document.querySelector("#add-list-modal");
  addListModalElement.classList.add("is-active");
};

export const listenToClickOnOpenAddListModalButton = () => {
  const openAddListModalButtonElement =
    document.querySelector("#add-list-button");
  openAddListModalButtonElement.addEventListener("click", openAddListModal);
};

export const addListToListsContainer = (addListData) => {
  const listId = generateRandomId();

  const listsContainerElement = document.querySelector("#lists-container");

  const listTemplateElement = document.querySelector("#list-template");

  const newListElement = listTemplateElement.content.cloneNode(true);
  newListElement.querySelector(`[slot="list-name"]`).textContent =
    addListData.name;
  newListElement.querySelector(`[slot="list-id"]`).id = `list-${listId}`;

  listsContainerElement.appendChild(newListElement);

  listenToClickOnOpenAddCardModalButton(listId);
};

export const listenToSubmitOnAddListForm = () => {
  const addListFormElement = document.querySelector(".modal-card form");

  addListFormElement.addEventListener("submit", (event) => {
    event.preventDefault();

    const addListFormData = new FormData(addListFormElement);
    const addListData = Object.fromEntries(addListFormData);

    addListToListsContainer(addListData);

    addListFormElement.reset();

    closeModals();
  });
};
