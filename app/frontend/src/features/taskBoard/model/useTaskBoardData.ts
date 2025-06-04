import { useEffect, useState } from "react";
import { useLoader } from "@/shared/ui/Loader/useLoader";
import { getTasks } from "@/features/taskBoard/api/task.api";
import { getTags } from "@/features/taskBoard/api/tag.api";
import { Column } from "@/features/taskBoard/model/Columns";
import { Tag } from "@/features/taskBoard/model/Tag";
import { Task } from "@/features/taskBoard/model/Task";

export default function useTaskBoardData(initialColumns: Column[]) {
  const [columns, setColumns] = useState<Column[]>(initialColumns);
  const [tags, setTags] = useState<Tag[]>([]);
  const { show, hide } = useLoader();

  const fetchTasks = async () => {
    show();
    try {
      const [tasks, newTags] = await Promise.all([getTasks(), getTags()]);
      const updatedColumns = initialColumns.map((column) => ({
        ...column,
        tasks: tasks.filter((task: Task) => task.status === column.id),
      }));
      setColumns(updatedColumns);
      setTags(newTags);
    } catch (error) {
      console.error("Erreur lors du chargement des données du board :", error);
      setColumns(initialColumns);
    } finally {
      hide();
    }
  };

  useEffect(() => {
    fetchTasks();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return { columns, tags, fetchTasks };
}
