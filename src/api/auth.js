const BASE_URL = import.meta.env.VITE_API_BASE_URL;

// REGISTER USER
export async function registerUser(data) {
  const payload = {
    username: data.email,        // Strapi requires username
    email: data.email,
    password: data.password,
    firstName: data.firstName,
    lastName: data.lastName,
    phone: data.phoneNumber,
  };

  const res = await fetch(`${BASE_URL}/auth/local/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  return await res.json();
}

// LOGIN USER
export async function loginUser(data) {
  const payload = {
    identifier: data.email,
    password: data.password,
  };

  const res = await fetch(`${BASE_URL}/auth/local`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  return await res.json();
}
