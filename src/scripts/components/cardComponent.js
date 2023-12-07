import { createCard, deleteCard, modifyCard } from "../api/cardApi";
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
  const cardId = addCardData.id;

  const listElement = document.querySelector(`#list-${addCardData.list_id}`);
  const cardsListContainerElement =
    listElement.querySelector(`[slot=list-content]`);

  const cardTemplateElement = document.querySelector("#card-template");

  const newCardElement = cardTemplateElement.content.cloneNode(true);
  newCardElement.querySelector(`[slot="card-title"]`).textContent =
    addCardData.title;
  newCardElement.querySelector(`[slot="card-id"]`).id = `card-${cardId}`;
  newCardElement.querySelector(
    `#card-${cardId}`
  ).style.backgroundColor = `${addCardData.color}`;

  cardsListContainerElement.appendChild(newCardElement);

  listenToClickOnOpenEditCardModalButton(cardId);

  listenToClickOnOpenDeleteCardModalButton(cardId);
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
  const cardNameElement = document.querySelector(
    `#card-${editCardData.id} [slot="card-title"]`
  );
  cardNameElement.textContent = editCardData.title;

  const cardColorElement = document.querySelector(`#card-${editCardData.id}`);
  cardColorElement.style.backgroundColor = editCardData.color;
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

    closeModals();
  });
};
