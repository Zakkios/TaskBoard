import api from "@/shared/api/api";
import { Task } from "@/features/taskBoard/model/Task";

export const getTasks = async () => {
  const response = await api.get(`/tasks`);
  return response.data.tasks;
};

export const getTaskById = async (taskId: string) => {
  const response = await api.get(`/tasks/${taskId}`);
  return response.data.task;
};

export const createTask = async (
  task: Omit<Task, "id" | "createdAt" | "updatedAt">
) => {
  const response = await api.post(`/tasks`, task);
  return response.data;
};

export const updateTask = async (
  taskId: string,
  task: Omit<Task, "id" | "createdAt" | "updatedAt">
) => {
  const response = await api.put(`/tasks/${taskId}`, task);
  return response.data;
};

export const deleteTask = async (taskId: string) => {
  const response = await api.delete(`/tasks/${taskId}`);
  return response.data;
};
