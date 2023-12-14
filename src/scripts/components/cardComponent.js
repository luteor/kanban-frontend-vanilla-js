import { createCard, deleteCard, modifyCard } from "../api/cardApi";
import { getAllLists } from "../api/listApi";
import { closeModals, rgbColorToHexColor } from "../utils/utils";

const openAddCardModal = (listId) => {
  const addCardModalElement = document.querySelector("#add-card-modal");
  addCardModalElement.classList.add("is-active");
  addCardModalElement.dataset.listId = listId;
};

export const listenToClickOnOpenAddCardModalButton = (listId) => {
  const openAddCardModalButtonElement = document.querySelector(
    `#list-${listId} [slot="add-card-button"]`
  );

  openAddCardModalButtonElement.addEventListener("click", () => {
    openAddCardModal(listId);
  });
};

export const addCardToCardsListContainer = (addCardData) => {
  const { id, title, color, list_id, position } = addCardData;

  const listElement = document.querySelector(`#list-${list_id}`);
  const cardsListContainerElement =
    listElement.querySelector(`[slot=list-content]`);

  const cardTemplateElement = document.querySelector("#card-template");

  const newCardElement = cardTemplateElement.content.cloneNode(true);
  newCardElement.querySelector(`[slot="card-title"]`).textContent = title;
  newCardElement.querySelector(`[slot="card-id"]`).id = `card-${id}`;
  newCardElement.querySelector(
    `#card-${id}`
  ).style.backgroundColor = `${color}`;
  newCardElement.querySelector(`[slot="card-id"]`).dataset.cardPosition =
    position;

  cardsListContainerElement.appendChild(newCardElement);

  listenToClickOnOpenEditCardModalButton(id);
  listenToClickOnOpenDeleteCardModalButton(id);
  listenToDragAndDropOnCards(id);
};

export const listenToSubmitOnAddCardForm = () => {
  const addCardModalElement = document.querySelector("#add-card-modal");
  const addCardFormElement = addCardModalElement.querySelector("form");

  addCardFormElement.addEventListener("submit", async (event) => {
    event.preventDefault();

    const addCardFormData = new FormData(addCardFormElement);
    const addCardData = Object.fromEntries(addCardFormData);

    const listId = addCardModalElement.dataset.listId;

    const createdCard = await createCard(addCardData, listId);

    addCardToCardsListContainer(createdCard);

    addCardFormElement.reset();

    closeModals();
  });
};

const openEditCardModal = (cardId) => {
  const editCardModalElement = document.querySelector("#edit-card-modal");
  editCardModalElement.classList.add("is-active");
  editCardModalElement.dataset.cardId = cardId;

  const currentCardName = document.querySelector(
    `#card-${cardId} [slot="card-title"]`
  ).textContent;

  const newCardNameElement =
    editCardModalElement.querySelector("#edit-card-title");
  newCardNameElement.placeholder = currentCardName;

  const currentCardColor = document.querySelector(`#card-${cardId}`).style
    .backgroundColor;

  const newCardColorElement =
    editCardModalElement.querySelector("#edit-card-color");
  newCardColorElement.value = rgbColorToHexColor(currentCardColor);
};

export const listenToClickOnOpenEditCardModalButton = (cardId) => {
  const openEditCardModalButtonElement = document.querySelector(
    `#card-${cardId} [slot="card-edit-button"]`
  );

  openEditCardModalButtonElement.addEventListener("click", () => {
    openEditCardModal(cardId);
  });
};

export const updateCardInCardsListContainer = (editCardData) => {
  const { id, title, color, position } = editCardData;

  const cardElement = document.querySelector(`#card-${id}`);
  cardElement.dataset.cardPosition = position;
  const cardNameElement = cardElement.querySelector(
    `#card-${id} [slot="card-title"]`
  );
  cardNameElement.textContent = title;

  const cardColorElement = document.querySelector(`#card-${id}`);
  cardColorElement.style.backgroundColor = color;
};

export const listenToSubmitOnEditCardForm = () => {
  const editCardModalElement = document.querySelector("#edit-card-modal");
  const editCardFormElement = editCardModalElement.querySelector("form");

  editCardFormElement.addEventListener("submit", async (event) => {
    event.preventDefault();

    const editCardFormData = new FormData(editCardFormElement);
    const editCardData = Object.fromEntries(editCardFormData);

    const cardId = editCardModalElement.dataset.cardId;

    const updatedCard = await modifyCard(editCardData, cardId);

    updateCardInCardsListContainer(updatedCard);

    editCardFormElement.reset();

    closeModals();
  });
};

const openDeleteCardModal = (cardId) => {
  const deleteCardModalElement = document.querySelector("#delete-card-modal");
  deleteCardModalElement.classList.add("is-active");
  deleteCardModalElement.dataset.cardId = cardId;
};

export const listenToClickOnOpenDeleteCardModalButton = (cardId) => {
  const openDeleteCardModalButtonElement = document.querySelector(
    `#card-${cardId} [slot="card-delete-button"]`
  );

  openDeleteCardModalButtonElement.addEventListener("click", () => {
    openDeleteCardModal(cardId);
  });
};

export const deleteCardInCardsListContainer = (cardId) => {
  const cardElement = document.querySelector(`#card-${cardId}`);
  cardElement.remove();
};

export const listenToSubmitOnDeleteCardForm = () => {
  const deleteCardModalElement = document.querySelector("#delete-card-modal");
  const deleteCardFormElement = deleteCardModalElement.querySelector("form");

  deleteCardFormElement.addEventListener("submit", async (event) => {
    event.preventDefault();

    const cardId = deleteCardModalElement.dataset.cardId;

    await deleteCard(cardId);

    deleteCardInCardsListContainer(cardId);

    const updatedLists = await getAllLists();
    updatedLists.forEach((list) => {
      const updatedCards = list.cards;
      updatedCards.forEach((card) => {
        updateCardInCardsListContainer(card);
      });
    });

    closeModals();
  });
};

export const listenToDragAndDropOnCards = (cardId) => {
  const draggedCardElement = document.querySelector(`#card-${cardId}`);

  draggedCardElement.addEventListener("dragstart", (event) => {
    event.stopPropagation();

    const draggedCardListElement = draggedCardElement.closest(".message");
    const draggedCardListId = draggedCardListElement.id;

    event.dataTransfer.setData("text/plain-draggedCardId", event.target.id);
    event.dataTransfer.setData("text/plain-draggedListId", draggedCardListId);

    event.target.dataset.initialDraggedRect = JSON.stringify(
      event.target.getBoundingClientRect()
    );

    draggedCardElement.classList.add("drag-card-element");
  });
};

export const listenToDropOnCardsDropZone = () => {
  const cardsDropZoneElements = document.querySelectorAll(".cards-drop-zone");

  cardsDropZoneElements.forEach((cardsDropZoneElement) => {
    cardsDropZoneElement.addEventListener("dragover", (event) => {
      event.stopPropagation();
      event.preventDefault();

      const draggedCardElement = document.querySelector(".drag-card-element");

      if (
        event.target.classList.contains("cards-drop-zone") &&
        event.target.childElementCount === 0
      ) {
        const emptyCardsDropZoneElement = event.target;
        emptyCardsDropZoneElement.appendChild(draggedCardElement);
      } else {
        const hoveredCardElement = event.target.closest(".card");

        if (hoveredCardElement && hoveredCardElement !== draggedCardElement) {
          const hoveredRect = hoveredCardElement.getBoundingClientRect();
          const halfHoveredRect = (hoveredRect.top + hoveredRect.bottom) / 2;

          if (event.clientY < halfHoveredRect) {
            hoveredCardElement.insertAdjacentElement(
              "afterend",
              draggedCardElement
            );
          } else if (event.clientY > halfHoveredRect) {
            hoveredCardElement.insertAdjacentElement(
              "beforebegin",
              draggedCardElement
            );
          }
        }
      }
    });

    cardsDropZoneElement.addEventListener("drop", async (event) => {
      event.stopPropagation();
      event.preventDefault();

      const droppedCardElementId = event.dataTransfer.getData(
        "text/plain-draggedCardId"
      );
      const droppedCardElement = document.querySelector(
        `#${droppedCardElementId}`
      );

      droppedCardElement.classList.remove("drag-card-element");

      const initialDraggedRect = JSON.parse(
        droppedCardElement.dataset.initialDraggedRect
      );
      delete droppedCardElement.dataset.initialDraggedRect;

      const finalDraggedRect = droppedCardElement.getBoundingClientRect();

      if (
        initialDraggedRect.y === finalDraggedRect.y &&
        initialDraggedRect.x === finalDraggedRect.x
      ) {
        console.error("Invalid position change");
        return;
      }

      const draggedCardListId = event.dataTransfer.getData(
        "text/plain-draggedListId"
      );

      const droppedCardListElement = droppedCardElement.closest(".message");
      const droppedCardListId = droppedCardListElement.id;

      const cardsFromDroppedCardListElements = Array.from(
        droppedCardListElement.querySelector(".cards-drop-zone").children
      );

      cardsFromDroppedCardListElements.forEach(async (card, index) => {
        const cardId = card.id.match(/\d+/);
        console.log(cardId);
        console.log(card);

        const newCardPosition = parseInt(index) + 1;
        console.log(newCardPosition);

        const droppedListId = droppedCardListId.match(/\d+/);

        await modifyCard(
          { position: newCardPosition, list_id: droppedListId },
          cardId
        );

        const updatedLists = await getAllLists();
        updatedLists.forEach((list) => {
          const updatedCards = list.cards;
          updatedCards.forEach((card) => {
            updateCardInCardsListContainer(card);
          });
        });
      });

      if (draggedCardListId !== droppedCardListId) {
        const draggedCardListElement = document.querySelector(
          `#${draggedCardListId}`
        );
        console.log(draggedCardListElement);

        const cardsFromDraggedCardListElements = Array.from(
          draggedCardListElement.querySelector(".cards-drop-zone").children
        );

        cardsFromDraggedCardListElements.forEach(async (card, index) => {
          const cardId = card.id.match(/\d+/);
          console.log(cardId);
          console.log(card);

          const newCardPosition = parseInt(index) + 1;
          console.log(newCardPosition);

          const draggedListId = draggedCardListId.match(/\d+/);

          await modifyCard(
            { position: newCardPosition, list_id: draggedListId },
            cardId
          );

          const updatedLists = await getAllLists();
          updatedLists.forEach((list) => {
            const updatedCards = list.cards;
            updatedCards.forEach((card) => {
              updateCardInCardsListContainer(card);
            });
          });
        });
      }
    });
  });
};
