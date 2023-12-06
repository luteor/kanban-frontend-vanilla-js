import { apiBaseUrl } from "./configApi";

export const getAllLists = async () => {
  try {
    const response = await fetch(`${apiBaseUrl}/lists`);

    if (!response.ok) {
      const errorMessage = await response.text();
      throw new Error(
        `Request failed with status ${response.status}: ${errorMessage}`
      );
    }

    const lists = await response.json();
    return lists;
  } catch (error) {
    console.error(error);
  }
};

export const createList = async (listData) => {
  try {
    const response = await fetch(`${apiBaseUrl}/lists`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        // 'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: JSON.stringify(listData),
    });

    if (!response.ok) {
      console.log(response);
      const errorMessage = await response.text();
      throw new Error(
        `Request failed with status ${response.status}: ${errorMessage}`
      );
    }

    const createdList = await response.json();
    return createdList;
  } catch (error) {
    console.error(error);
  }
};
