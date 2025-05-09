import api from "@/shared/api/api";

export const register = async (
  email: string,
  username: string,
  password: string
) => {
  const response = await api.post("/register", {
    email,
    username,
    password,
  });
  return response.data;
};
