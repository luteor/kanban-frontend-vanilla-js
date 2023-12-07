import { apiBaseUrl } from "./configApi";

export const createCard = async (cardData, listId) => {
  try {
    const createdCardData = {
      ...cardData,
      list_id: listId,
    };
    const response = await fetch(`${apiBaseUrl}/cards`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        // 'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: JSON.stringify(createdCardData),
    });

    if (!response.ok) {
      const errorMessage = await response.text();
      throw new Error(
        `Request failed with status ${response.status}: ${errorMessage}`
      );
    }

    const createdCard = await response.json();
    console.log(createdCard);
    return createdCard;
  } catch (error) {
    console.error(error);
  }
};

export const modifyCard = async (cardData, cardId) => {
  try {
    const response = await fetch(`${apiBaseUrl}/cards/${cardId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        // 'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: JSON.stringify(cardData),
    });

    if (!response.ok) {
      const errorMessage = await response.text();
      throw new Error(
        `Request failed with status ${response.status}: ${errorMessage}`
      );
    }

    const updatedCard = await response.json();
    return updatedCard;
  } catch (error) {
    console.error(error);
  }
};

export const deleteCard = async (cardId) => {
  try {
    const response = await fetch(`${apiBaseUrl}/cards/${cardId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        // 'Content-Type': 'application/x-www-form-urlencoded',
      },
    });

    if (!response.ok) {
      const errorMessage = await response.text();
      throw new Error(
        `Request failed with status ${response.status}: ${errorMessage}`
      );
    }
  } catch (error) {
    console.error(error);
  }
};
