const BASE_URL = import.meta.env.VITE_API_BASE_URL;

export async function createBooking(data, token) {
  const res = await fetch(`${BASE_URL}/bookings`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ data }),
  });

  return await res.json();
}
