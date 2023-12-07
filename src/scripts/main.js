import { getAllLists } from "./api/listApi";
import {
  addCardToCardsListContainer,
  listenToSubmitOnAddCardForm,
  listenToSubmitOnDeleteCardForm,
  listenToSubmitOnEditCardForm,
} from "./components/cardComponent";
import {
  addListToListsContainer,
  listenToClickOnOpenAddListModalButton,
  listenToSubmitOnAddListForm,
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
};

const listenToUserActions = () => {
  listenToClickOnOpenAddListModalButton();
  listenToClickOnCloseModalButtonsAndOnModalBackground();
  listenToSubmitOnAddListForm();
  listenToSubmitOnAddCardForm();
  listenToSubmitOnEditListForm();
  listenToSubmitOnEditCardForm();
  listenToSubmitOnDeleteCardForm();
};

displayExistingListsWithCards();
listenToUserActions();
