import { Task, TaskStatus } from "@/features/taskBoard/model/Task";

export interface Column {
  id: TaskStatus;
  title: string;
  color: string;
  tasks: Task[];
}
