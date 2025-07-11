import { Task, TaskStatus } from "@/features/taskBoard";

export interface Column {
  id: TaskStatus;
  title: string;
  color: string;
  tasks: Task[];
}
