import api from "@/shared/api/api";

export const getTags = async () => {
  const response = await api.get(`/tags`);
  return response.data.tags;
};
