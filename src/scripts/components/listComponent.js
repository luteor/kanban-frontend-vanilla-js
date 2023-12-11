import { createList, deleteList, modifyList } from "../api/listApi";
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
  const listPosition = addListData.position;

  const listsContainerElement = document.querySelector("#lists-container");

  const listTemplateElement = document.querySelector("#list-template");

  const newListElement = listTemplateElement.content.cloneNode(true);
  newListElement.querySelector(`[slot="list-name"]`).textContent =
    addListData.name;
  newListElement.querySelector(`[slot="list-id"]`).id = `list-${listId}`;

  newListElement.querySelector(`[slot="list-id"]`).dataset.position =
    listPosition;

  listsContainerElement.appendChild(newListElement);

  listenToClickOnOpenEditListModalButton(listId);

  listenToClickOnOpenAddCardModalButton(listId);

  listenToDragAndDropOnLists(listId);
};

export const listenToSubmitOnAddListForm = () => {
  const addListModalElement = document.querySelector("#add-list-modal");
  const addListFormElement = addListModalElement.querySelector("form");

  addListFormElement.addEventListener("submit", async (event) => {
    event.preventDefault();

    const addListFormData = new FormData(addListFormElement);
    const addListData = Object.fromEntries(addListFormData);

    const createdList = await createList(addListData);

    addListToListsContainer(createdList);

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

  listenToClickOnOpenDeleteListModalButton(listId);
};

export const listenToClickOnOpenEditListModalButton = (listId) => {
  const openEditListModalButtonElement = document.querySelector(
    `#list-${listId} [slot="list-name"]`
  );

  openEditListModalButtonElement.addEventListener("click", () => {
    openEditListModal(listId);
  });
};

export const updateListInListsContainer = (editListData) => {
  const listNameElement = document.querySelector(
    `#list-${editListData.id} [slot="list-name"]`
  );
  listNameElement.textContent = editListData.name;
};

export const listenToSubmitOnEditListForm = () => {
  const editListModalElement = document.querySelector("#edit-list-modal");
  const editListFormElement = editListModalElement.querySelector("form");

  editListFormElement.addEventListener("submit", async (event) => {
    event.preventDefault();

    const editListFormData = new FormData(editListFormElement);
    const editListData = Object.fromEntries(editListFormData);

    const listId = editListModalElement.dataset.listId;

    const updatedList = await modifyList(editListData, listId);

    updateListInListsContainer(updatedList);

    editListFormElement.reset();

    closeModals();
  });
};

const openDeleteListModal = (listId) => {
  const deleteListModalElement = document.querySelector("#delete-list-modal");
  deleteListModalElement.classList.add("is-active");
  deleteListModalElement.dataset.listId = listId;
};

export const listenToClickOnOpenDeleteListModalButton = (listId) => {
  const openDeleteListModalButtonElement = document.querySelector(
    `#edit-list-modal .is-danger`
  );

  openDeleteListModalButtonElement.addEventListener("click", () => {
    closeModals();

    openDeleteListModal(listId);
  });
};

export const deleteListInListsContainer = (listId) => {
  const listElement = document.querySelector(`#list-${listId}`);

  listElement.remove();
};

export const listenToSubmitOnDeleteListForm = () => {
  const deleteListModalElement = document.querySelector("#delete-list-modal");
  const deleteListFormElement = deleteListModalElement.querySelector("form");

  deleteListFormElement.addEventListener("submit", async (event) => {
    event.preventDefault();

    const listId = deleteListModalElement.dataset.listId;

    await deleteList(listId);

    deleteListInListsContainer(listId);

    closeModals();
  });
};

export const listenToDragAndDropOnLists = (listId) => {
  const dragAndDropListElement = document.querySelector(`#list-${listId}`);
  console.log(dragAndDropListElement);

  dragAndDropListElement.addEventListener("dragstart", (event) => {
    event.dataTransfer.setData("text/plain", event.target.id);
    dragAndDropListElement.classList.add("drag-element");
  });

  dragAndDropListElement.addEventListener("dragend", () => {
    dragAndDropListElement.classList.remove("drag-element");
  });
};

export const listenToDropOnListsDropZone = () => {
  const listsDropZoneElement = document.querySelector(".drop-zone");

  listsDropZoneElement.addEventListener("dragover", (event) => {
    event.preventDefault();

    const hoveredListItem = event.target.closest(".message");

    if (hoveredListItem) {
      const draggedListElement = document.querySelector(".drag-element");

      const hoveredRect = hoveredListItem.getBoundingClientRect();
      const halfHoveredRect = (hoveredRect.left + hoveredRect.right) / 2;

      if (event.clientX < halfHoveredRect) {
        hoveredListItem.insertAdjacentElement(
          "beforebegin",
          draggedListElement
        );
      } else {
        hoveredListItem.insertAdjacentElement("afterend", draggedListElement);
      }
    }
  });

  listsDropZoneElement.addEventListener("drop", (event) => {
    event.preventDefault();

    const droppedListElementId = event.dataTransfer.getData("text/plain");
    const droppedListElement = document.querySelector(
      `#${droppedListElementId}`
    );

    droppedListElement.classList.remove("drag-element");

    const hoveredListItem = event.target.closest(".message");

    if (hoveredListItem) {
      const hoveredRect = hoveredListItem.getBoundingClientRect();
      const halfHoveredRect = (hoveredRect.left + hoveredRect.right) / 2;

      if (event.clientX < halfHoveredRect) {
        hoveredListItem.insertAdjacentElement(
          "beforebegin",
          droppedListElement
        );
      } else {
        hoveredListItem.insertAdjacentElement("afterend", droppedListElement);
      }
    }
  });
};
