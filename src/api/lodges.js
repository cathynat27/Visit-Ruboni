const BASE_URL = import.meta.env.VITE_API_BASE_URL;

export async function fetchLodges() {
  const res = await fetch(`${BASE_URL}/lodges?populate=*`);
  if (!res.ok) throw new Error("Failed to fetch lodges");
  const data = await res.json();
  return data.data; // Strapi returns objects inside `data`
}

//fetching all safaris
export async function fetchLodgeById(id) {
  const res = await fetch(`${BASE_URL}/lodges/${id}?populate=*`);
  if (!res.ok) throw new Error("Failed to fetch lodge");
  const data = await res.json();
  return data.data;
}
