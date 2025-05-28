import { TaskStatus } from "@/features/taskBoard/model/Task";

const COLUMNS = [
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
    title: "Terminées",
    color: "green",
    tasks: [],
  },
];

export default COLUMNS;
