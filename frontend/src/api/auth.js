export const getMe = async () => {
  const res = await fetch("http://localhost:9000/api/auth/me", {
    credentials: "include",
  });

  return await res.json();
};

export const login = async (username, password) => {
  const res = await fetch("http://localhost:9000/api/auth/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    body: JSON.stringify({ username, password }),
  });

  return await res.json();
};

export const logout = async () => {
  const res = await fetch("http://localhost:9000/api/auth/logout", {
    method: "POST",
    credentials: "include",
  });

  return await res.json();
};