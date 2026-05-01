const BASE_URL = "http://localhost:5000/api/admin";

export const login = async (data) => {
  const res = await fetch(`${BASE_URL}/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify(data),
  });

  const result = await res.json();
  if (!res.ok) throw new Error(result.message);

  return result;
};

export const getMe = async () => {
  const res = await fetch(`${BASE_URL}/me`, {
    credentials: "include",
  });

  if (!res.ok) return null;
  return res.json();
};

export const logout = async () => {
  await fetch(`${BASE_URL}/logout`, {
    method: "POST",
    credentials: "include",
  });
};