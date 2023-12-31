export const closeModals = () => {
  const modalElements = document.querySelectorAll(".modal");
  modalElements.forEach((element) => {
    for (const key in element.dataset) {
      delete element.dataset[key];
    }
    const formModalElement = element.querySelector("form");
    formModalElement.reset();
    element.classList.remove("is-active");
  });
};

export const listenToClickOnCloseModalButtonsAndOnModalBackground = () => {
  const closeModalButtonElements = document.querySelectorAll(".close");
  closeModalButtonElements.forEach((element) => {
    element.addEventListener("click", closeModals);
  });

  const modalBackgroundElements =
    document.querySelectorAll(".modal-background");
  modalBackgroundElements.forEach((element) => {
    element.addEventListener("click", closeModals);
  });
};

export const generateRandomId = () => {
  const randomId = Math.floor(Math.random() * 100).toString();
  return randomId;
};

export const rgbColorToHexColor = (rgbColor) => {
  const rgbColorArray = rgbColor.match(/\d+/g);

  const hexColor = rgbColorArray
    .map((value) => {
      const hexColorValue = parseInt(value, 10).toString(16);
      return hexColorValue.length === 1 ? "0" + hexColorValue : hexColorValue;
    })
    .join("");

  return "#" + hexColor;
};
