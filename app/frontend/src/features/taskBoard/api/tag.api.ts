import { api } from "@/shared";

export const getTags = async () => {
  const response = await api.get(`/tags`);
  return response.data.tags;
};
