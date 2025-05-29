import { Task, TaskStatus } from "./Task";

export interface Column {
  id: TaskStatus;
  title: string;
  color: string;
  tasks: Task[];
}
