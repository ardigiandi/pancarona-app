export let users = [
  {
    id: 1,
    name: "Muhammad Ardiansyah Giandi",
    email: "ardiansyahg9080@gmail.com",
    password: "password123",
    createdAt: "2026-01-01",
  },
  {
    id: 2,
    name: "Anisa Ayu Nabilla",
    email: "Anisaayu@gmail.com",
    password: "password123",
    createdAt: "2026-02-01",
  },
];

export const registerUser = (name, email, password) => {
  const exists = users.find((u) => u.email === email);
  if (exists) {
    return { success: false, message: "Email sudah terdaftar" };
  }

  const newUsers = {
    id: users.length + 1,
    name,
    email,
    password,
    createdAt: new Date().toISOString().split("T")[0],
  };

  users.push(newUsers);
  return { success: true, user: newUsers };
};

export const loginUser = (email, password) => {
  const user = users.find((u) => u.email === email && u.password === password);

  if (!user) {
    return { success: false, message: "Email atau password salah" };
  }

  // jangan return password ke client
  const { password: _, ...safeUser } = user;
  return { success: true, user: safeUser };
};
