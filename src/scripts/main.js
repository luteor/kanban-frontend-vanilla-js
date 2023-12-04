import {
  listenToClickOnOpenAddListModalButton,
  listenToSubmitOnAddListForm,
} from "./components/listComponent";
import { listenToClickOnCloseModalButtonsAndOnModalBackground } from "./utils/utils";

const listenToUserActions = () => {
  listenToClickOnOpenAddListModalButton();
  listenToClickOnCloseModalButtonsAndOnModalBackground();
  listenToSubmitOnAddListForm();
};

listenToUserActions();
