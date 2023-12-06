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