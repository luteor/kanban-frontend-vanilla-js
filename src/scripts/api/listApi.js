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
