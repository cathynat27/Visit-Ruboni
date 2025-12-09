// src/rest.js
const BASE_URL = import.meta.env.VITE_API_BASE_URL;

/**
 * Create a lodge
 */
export const createLodge = async (payload) => {
  try {
    const res = await fetch(`${BASE_URL}/lodges`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ data: payload }),
    });
    return res.json();
  } catch (error) {
    console.error("Create lodge error:", error);
    return null;
  }
};

/**
 * Update a lodge
 */
export const updateLodge = async (id, payload) => {
  try {
    const res = await fetch(`${BASE_URL}/lodges/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ data: payload }),
    });
    return res.json();
  } catch (error) {
    console.error("Update lodge error:", error);
    return null;
  }
};

/**
 * Delete a lodge
 */
export const deleteLodge = async (id) => {
  try {
    const res = await fetch(`${BASE_URL}/lodges/${id}`, {
      method: "DELETE",
    });
    return res.json();
  } catch (error) {
    console.error("Delete lodge error:", error);
    return null;
  }
};
