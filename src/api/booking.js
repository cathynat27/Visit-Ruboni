const BASE_URL = import.meta.env.VITE_API_BASE_URL;

// CREATE BOOKING
export async function createBooking(data) {
  const token = localStorage.getItem("token");

  const payload = {
    data: {
      checkInDate: data.checkInDate,
      checkOutDate: data.checkOutDate,
      numberOfGuests: data.numberOfGuests,
      totalPrice: data.totalPrice,
      status: data.status || "pending",
      accommodationId: data.accommodationId,
      activityId: data.activityId,
      notes: data.notes || "",
      user: data.userId, // Relationship with users-permissions
    },
  };

  const res = await fetch(`${BASE_URL}/bookings`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(payload),
  });

  const result = await res.json();
  if (!res.ok) {
    throw new Error(result.error?.message || "Failed to create booking");
  }
  return result.data;
}

// GET ALL BOOKINGS
export async function fetchBookings(filters = {}) {
  const token = localStorage.getItem("token");
  
  let queryParams = new URLSearchParams();
  queryParams.append("populate", "*");
  
  // Add filters if provided
  if (filters.status) {
    queryParams.append("filters[status][$eq]", filters.status);
  }
  if (filters.userId) {
    queryParams.append("filters[user][id][$eq]", filters.userId);
  }
  if (filters.accommodationId) {
    queryParams.append("filters[accommodation][id][$eq]", filters.accommodationId);
  }

  const res = await fetch(`${BASE_URL}/bookings?${queryParams.toString()}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  const result = await res.json();
  if (!res.ok) {
    throw new Error(result.error?.message || "Failed to fetch bookings");
  }
  return result.data;
}

// GET BOOKING BY ID
export async function fetchBookingById(id) {
  const token = localStorage.getItem("token");

  const res = await fetch(`${BASE_URL}/bookings/${id}?populate=*`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  const result = await res.json();
  if (!res.ok) {
    throw new Error(result.error?.message || "Failed to fetch booking");
  }
  return result.data;
}

// UPDATE BOOKING
export async function updateBooking(id, data) {
  const token = localStorage.getItem("token");

  const payload = {
    data: {
      checkInDate: data.checkInDate,
      checkOutDate: data.checkOutDate,
      numberOfGuests: data.numberOfGuests,
      totalPrice: data.totalPrice,
      status: data.status,
      accommodationId: data.accommodationId,
      activityId: data.activityId,
      notes: data.notes,
    },
  };

  const res = await fetch(`${BASE_URL}/bookings/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(payload),
  });

  const result = await res.json();
  if (!res.ok) {
    throw new Error(result.error?.message || "Failed to update booking");
  }
  return result.data;
}

// DELETE BOOKING
export async function deleteBooking(id) {
  const token = localStorage.getItem("token");

  const res = await fetch(`${BASE_URL}/bookings/${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  if (!res.ok) {
    const result = await res.json();
    throw new Error(result.error?.message || "Failed to delete booking");
  }
  return { success: true };
}

// CREATE BOOKING LOCALIZATION
export async function createBookingLocalization(bookingId, data) {
  const token = localStorage.getItem("token");

  const payload = {
    data: {
      checkInDate: data.checkInDate,
      checkOutDate: data.checkOutDate,
      numberOfGuests: data.numberOfGuests,
      totalPrice: data.totalPrice,
      status: data.status,
      notes: data.notes,
      locale: data.locale || "en", // Language/localization code
    },
  };

  const res = await fetch(`${BASE_URL}/bookings/${bookingId}/localizations`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(payload),
  });

  const result = await res.json();
  if (!res.ok) {
    throw new Error(result.error?.message || "Failed to create booking localization");
  }
  return result.data;
}

// GET USER BOOKINGS
export async function fetchUserBookings(userId) {
  const token = localStorage.getItem("token");

  const res = await fetch(`${BASE_URL}/bookings?filters[user][id][$eq]=${userId}&populate=*`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  const result = await res.json();
  if (!res.ok) {
    throw new Error(result.error?.message || "Failed to fetch user bookings");
  }
  return result.data;
}

// CANCEL BOOKING
export async function cancelBooking(id) {
  return updateBooking(id, { status: "cancelled" });
}

// CONFIRM BOOKING
export async function confirmBooking(id) {
  return updateBooking(id, { status: "confirmed" });
}

