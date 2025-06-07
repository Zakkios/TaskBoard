import { Tag } from "@/features/taskBoard";

export type TaskStatus = "todo" | "doing" | "done";

export interface Task {
  id: string;
  title: string;
  description: string;
  status: TaskStatus;
  tags: Tag[];
  updatedAt: string;
}

export type TaskFormData = Omit<Task, "id" | "updatedAt" | "tags"> & {
  tags: string[];
};
