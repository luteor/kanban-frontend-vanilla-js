import { getAllLists } from "./api/listApi";
import { listenToSubmitOnAddCardForm } from "./components/cardComponent";
import {
  addListToListsContainer,
  listenToClickOnOpenAddListModalButton,
  listenToSubmitOnAddListForm,
} from "./components/listComponent";
import { listenToClickOnCloseModalButtonsAndOnModalBackground } from "./utils/utils";

const displayExistingLists = async () => {
  const lists = await getAllLists();
  lists.forEach((element) => {
    addListToListsContainer(element);
  });
};

const listenToUserActions = () => {
  listenToClickOnOpenAddListModalButton();
  listenToClickOnCloseModalButtonsAndOnModalBackground();
  listenToSubmitOnAddListForm();
  listenToSubmitOnAddCardForm();
};

displayExistingLists();
listenToUserActions();
