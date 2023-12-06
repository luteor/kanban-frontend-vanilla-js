import { createCard } from "../api/cardApi";
import { closeModals } from "../utils/utils";

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
