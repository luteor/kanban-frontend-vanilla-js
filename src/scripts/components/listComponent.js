import {
  createList,
  deleteList,
  getAllLists,
  modifyList,
} from "../api/listApi";
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
  const { id, position, name } = addListData;

  const listsContainerElement = document.querySelector("#lists-container");

  const listTemplateElement = document.querySelector("#list-template");

  const newListElement = listTemplateElement.content.cloneNode(true);
  newListElement.querySelector(`[slot="list-name"]`).textContent = name;
  newListElement.querySelector(`[slot="list-id"]`).id = `list-${id}`;

  newListElement.querySelector(`[slot="list-id"]`).dataset.listPosition =
    position;

  listsContainerElement.appendChild(newListElement);

  listenToClickOnOpenEditListModalButton(id);
  listenToClickOnOpenAddCardModalButton(id);
  listenToDragAndDropOnLists(id);
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
  const { id, position, name } = editListData;

  const listElement = document.querySelector(`#list-${id}`);
  listElement.dataset.listPosition = position;
  const listNameElement = listElement.querySelector(
    `#list-${id} [slot="list-name"]`
  );
  listNameElement.textContent = name;
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

    const updatedLists = await getAllLists();
    updatedLists.forEach((list) => {
      updateListInListsContainer(list);
    });

    closeModals();
  });
};

export const listenToDragAndDropOnLists = (listId) => {
  const draggedListElement = document.querySelector(`#list-${listId}`);

  draggedListElement.addEventListener("dragstart", (event) => {
    event.dataTransfer.setData("text/plain", event.target.id);
    draggedListElement.classList.add("drag-element");
  });

  draggedListElement.addEventListener("dragend", () => {
    draggedListElement.classList.remove("drag-element");
  });
};

export const listenToDropOnListsDropZone = () => {
  const listsDropZoneElement = document.querySelector(".drop-zone");

  let originalHoveredListId = null;
  let initialDraggedRect = null;
  let finalDraggedRect = null;

  listsDropZoneElement.addEventListener("dragstart", () => {
    const draggedListElement = document.querySelector(".drag-element");
    initialDraggedRect = draggedListElement.getBoundingClientRect();
  });

  listsDropZoneElement.addEventListener("dragover", (event) => {
    event.preventDefault();

    const draggedListElement = document.querySelector(".drag-element");

    const hoveredListElement = event.target.closest(".message");

    if (hoveredListElement && hoveredListElement !== draggedListElement) {
      if (!hoveredListElement.classList.contains("drag-element")) {
        originalHoveredListId = hoveredListElement.id;
      }

      const hoveredRect = hoveredListElement.getBoundingClientRect();
      const halfHoveredRect = (hoveredRect.left + hoveredRect.right) / 2;

      if (event.clientX < halfHoveredRect) {
        hoveredListElement.insertAdjacentElement(
          "afterend",
          draggedListElement
        );
      } else if (event.clientX > halfHoveredRect) {
        hoveredListElement.insertAdjacentElement(
          "beforebegin",
          draggedListElement
        );
      }
    }
  });

  listsDropZoneElement.addEventListener("drop", async (event) => {
    event.preventDefault();

    const droppedListElementId = event.dataTransfer.getData("text/plain");
    const droppedListElement = document.querySelector(
      `#${droppedListElementId}`
    );
    droppedListElement.classList.remove("drag-element");

    finalDraggedRect = droppedListElement.getBoundingClientRect();

    if (!originalHoveredListId || initialDraggedRect.x === finalDraggedRect.x) {
      console.error("Invalid position change");
      return;
    }

    const hoveredListElement = document.querySelector(
      `#${originalHoveredListId}`
    );

    const hoveredListElementPosition = hoveredListElement.dataset.listPosition;

    if (hoveredListElement && hoveredListElement !== droppedListElement) {
      const listId = droppedListElementId.match(/\d+/);
      await modifyList({ position: hoveredListElementPosition }, listId);

      const updatedLists = await getAllLists();
      updatedLists.forEach((list) => {
        updateListInListsContainer(list);
      });
    }

    originalHoveredListId = null;
  });
};
