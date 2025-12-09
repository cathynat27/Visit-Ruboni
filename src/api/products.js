const BASE_URL = import.meta.env.VITE_API_BASE_URL;

export async function fetchProducts() {
  const res = await fetch(`${BASE_URL}/products?populate=*`);
  if (!res.ok) throw new Error("Failed to fetch products");
  const data = await res.json();
  return data.data; // Strapi returns objects inside `data`
}
export async function fetchProductById(id) {
  const res = await fetch(`${BASE_URL}/products/${id}?populate=*`);
  if (!res.ok) throw new Error("Failed to fetch product");
  const data = await res.json();
  return data.data;
}