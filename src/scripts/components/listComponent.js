import { createList } from "../api/listApi";
import { closeModals } from "../utils/utils";
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
  const listId = addListData.id;

  const listsContainerElement = document.querySelector("#lists-container");

  const listTemplateElement = document.querySelector("#list-template");

  const newListElement = listTemplateElement.content.cloneNode(true);
  newListElement.querySelector(`[slot="list-name"]`).textContent =
    addListData.name;
  newListElement.querySelector(`[slot="list-id"]`).id = `list-${listId}`;

  listsContainerElement.appendChild(newListElement);

  listenToClickOnOpenEditListModalButton(listId);

  listenToClickOnOpenAddCardModalButton(listId);
};

export const listenToSubmitOnAddListForm = () => {
  const addListFormElement = document.querySelector(".modal-card form");

  addListFormElement.addEventListener("submit", (event) => {
    event.preventDefault();

    const addListFormData = new FormData(addListFormElement);
    const addListData = Object.fromEntries(addListFormData);
    console.log(addListData);

    createList(addListData);

    addListToListsContainer(addListData);

    addListFormElement.reset();

    closeModals();
  });
};

const openEditListModal = (listId) => {
  const editListModalElement = document.querySelector("#edit-list-modal");
  editListModalElement.classList.add("is-active");
  editListModalElement.dataset.listId = listId;
};

export const listenToClickOnOpenEditListModalButton = (listId) => {
  const openEditListModalButtonElement = document.querySelector(
    `#list-${listId} [slot="list-name"]`
  );

  openEditListModalButtonElement.addEventListener("click", () => {
    openEditListModal(listId);
  });
};
