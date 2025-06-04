import { TaskStatus } from "@/features/taskBoard/model/Task";
import { Column } from "@/features/taskBoard/model/Columns";

const COLUMNS: Column[] = [
  {
    id: "todo" as TaskStatus,
    title: "À faire",
    color: "orange",
    tasks: [],
  },
  {
    id: "doing" as TaskStatus,
    title: "En cours",
    color: "secondary",
    tasks: [],
  },
  {
    id: "done" as TaskStatus,
    title: "Terminé",
    color: "green",
    tasks: [],
  },
];

export default COLUMNS;
