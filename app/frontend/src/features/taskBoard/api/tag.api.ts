import { api } from "@/shared";

export const getTags = async () => {
  const response = await api.get(`/tags`);
  return response.data.tags;
};

export const createTag = async (tag: { name: string; color: string }) => {
  const response = await api.post(`/tags`, tag);
  return response.data;
};

export const updateTag = async (
  tagId: string,
  tag: { name: string; color: string }
) => {
  const response = await api.put(`/tags/${tagId}`, tag);
  return response.data;
};

export const deleteTag = async (tagId: string) => {
  const response = await api.delete(`/tags/${tagId}`);
  return response.data;
};
