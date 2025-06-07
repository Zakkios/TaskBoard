import { api } from "@/shared";
import { Task, TaskFormData } from "@/features/taskBoard";

export const getTasks = async (): Promise<Task[]> => {
  const response = await api.get(`/tasks`);
  return response.data.tasks;
};

export const getTaskById = async (taskId: string): Promise<Task> => {
  const response = await api.get(`/tasks/${taskId}`);
  return response.data.task;
};

export const createTask = async (task: TaskFormData) => {
  const response = await api.post(`/tasks`, task);
  return response.data;
};

export const updateTask = async (taskId: string, task: TaskFormData) => {
  const response = await api.put(`/tasks/${taskId}`, task);
  return response.data;
};

export const deleteTask = async (taskId: string) => {
  const response = await api.delete(`/tasks/${taskId}`);
  return response.data;
};
