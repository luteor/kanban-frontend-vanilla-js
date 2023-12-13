import { getAllLists } from "./api/listApi";
import {
  addCardToCardsListContainer,
  listenToDropOnCardsDropZone,
  listenToSubmitOnAddCardForm,
  listenToSubmitOnDeleteCardForm,
  listenToSubmitOnEditCardForm,
} from "./components/cardComponent";
import {
  addListToListsContainer,
  listenToClickOnOpenAddListModalButton,
  listenToDropOnListsDropZone,
  listenToSubmitOnAddListForm,
  listenToSubmitOnDeleteListForm,
  listenToSubmitOnEditListForm,
} from "./components/listComponent";
import { listenToClickOnCloseModalButtonsAndOnModalBackground } from "./utils/utils";

const displayExistingListsWithCards = async () => {
  const lists = await getAllLists();

  lists.forEach((list) => {
    addListToListsContainer(list);

    const cards = list.cards;
    cards.forEach((card) => {
      addCardToCardsListContainer(card, list.id);
    });
  });
  listenToDropOnCardsDropZone();
};

const listenToUserActions = () => {
  listenToClickOnOpenAddListModalButton();
  listenToClickOnCloseModalButtonsAndOnModalBackground();
  listenToSubmitOnAddListForm();
  listenToSubmitOnAddCardForm();
  listenToSubmitOnEditListForm();
  listenToSubmitOnEditCardForm();
  listenToSubmitOnDeleteCardForm();
  listenToSubmitOnDeleteListForm();
  listenToDropOnListsDropZone();
};

displayExistingListsWithCards();
listenToUserActions();
