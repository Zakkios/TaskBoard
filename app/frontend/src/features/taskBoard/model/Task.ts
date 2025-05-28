export type TaskStatus = "todo" | "doing" | "done";

export interface Task {
  id: string;
  title: string;
  description: string;
  status: TaskStatus;
  tags: string[];
  updatedAt: string;
}

export interface Column {
  id: TaskStatus;
  title: string;
  color: string;
  tasks: Task[];
}
