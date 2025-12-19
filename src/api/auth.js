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

// FORGOT PASSWORD
export async function forgotPassword(email) {
  const res = await fetch(`${BASE_URL}/auth/forgot-password`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email }),
  });

  return await res.json();
}

// RESET PASSWORD
export async function resetPassword(data) {
  const payload = {
    code: data.code,
    password: data.password,
    passwordConfirmation: data.passwordConfirmation,
  };

  const res = await fetch(`${BASE_URL}/auth/reset-password`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  return await res.json();
}

// CHANGE PASSWORD
export async function changePassword(data) {
  const token = localStorage.getItem("token");

  const payload = {
    currentPassword: data.currentPassword,
    password: data.password,
    passwordConfirmation: data.passwordConfirmation,
  };

  const res = await fetch(`${BASE_URL}/auth/change-password`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(payload),
  });

  return await res.json();
}

// SEND EMAIL CONFIRMATION
export async function sendEmailConfirmation(email) {
  const res = await fetch(`${BASE_URL}/auth/send-email-confirmation`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email }),
  });

  return await res.json();
}

// EMAIL CONFIRMATION
export async function emailConfirmation(confirmationToken) {
  const res = await fetch(`${BASE_URL}/auth/email-confirmation?confirmation=${confirmationToken}`, {
    method: "GET",
  });

  return await res.json();
}

// CONNECT PROVIDER (OAuth)
export async function connectProvider(provider) {
  const token = localStorage.getItem("token");

  const res = await fetch(`${BASE_URL}/connect/${provider}`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return await res.json();
}

// CALLBACK FOR OAUTH (usually handled by backend redirect)
export async function oauthCallback(provider, params) {
  const res = await fetch(`${BASE_URL}/auth/${provider}/callback?${new URLSearchParams(params)}`, {
    method: "GET",
  });

  return await res.json();
}
