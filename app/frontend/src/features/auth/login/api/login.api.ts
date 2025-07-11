import { api } from "@/shared";

export const login = async (email: string, password: string) => {
  const response = await api.post("/login_check", {
    username: email,
    password,
  });
  return response.data;
};
