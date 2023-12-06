import { getAllLists } from "./api/listApi";
import {
  addCardToCardsListContainer,
  listenToSubmitOnAddCardForm,
} from "./components/cardComponent";
import {
  addListToListsContainer,
  listenToClickOnOpenAddListModalButton,
  listenToSubmitOnAddListForm,
} from "./components/listComponent";
import { listenToClickOnCloseModalButtonsAndOnModalBackground } from "./utils/utils";

const displayExistingListsWithCards = async () => {
  const lists = await getAllLists();
  lists.forEach((list) => {
    addListToListsContainer(list);

    const cards = list.cards;
    cards.forEach((card) => {
      console.log(card);
      addCardToCardsListContainer(card, list.id);
    });
  });
};

const listenToUserActions = () => {
  listenToClickOnOpenAddListModalButton();
  listenToClickOnCloseModalButtonsAndOnModalBackground();
  listenToSubmitOnAddListForm();
  listenToSubmitOnAddCardForm();
};

displayExistingListsWithCards();
listenToUserActions();
