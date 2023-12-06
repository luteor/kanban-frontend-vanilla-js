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
  const addListModalElement = document.querySelector("#add-list-modal");
  const addListFormElement = addListModalElement.querySelector("form");

  addListFormElement.addEventListener("submit", (event) => {
    event.preventDefault();

    const addListFormData = new FormData(addListFormElement);
    const addListData = Object.fromEntries(addListFormData);

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

  const currentListName = document.querySelector(
    `#list-${listId} [slot="list-name"]`
  ).textContent;

  const newListNameElement = editListModalElement.querySelector("input");
  newListNameElement.placeholder = currentListName;
};

export const listenToClickOnOpenEditListModalButton = (listId) => {
  const openEditListModalButtonElement = document.querySelector(
    `#list-${listId} [slot="list-name"]`
  );

  openEditListModalButtonElement.addEventListener("click", () => {
    openEditListModal(listId);
  });
};

export const updateListInListsContainer = (editListData, listId) => {
  const listNameElement = document.querySelector(
    `#list-${listId} [slot="list-name"]`
  );
  listNameElement.textContent = editListData.name;
};

export const listenToSubmitOnEditListForm = () => {
  const editListModalElement = document.querySelector("#edit-list-modal");
  const editListFormElement = editListModalElement.querySelector("form");

  console.log(editListFormElement);
  editListFormElement.addEventListener("submit", (event) => {
    event.preventDefault();

    const editListFormData = new FormData(editListFormElement);
    const editListData = Object.fromEntries(editListFormData);

    const listId = editListModalElement.dataset.listId;

    updateListInListsContainer(editListData, listId);

    editListFormElement.reset();

    closeModals();
  });
};
