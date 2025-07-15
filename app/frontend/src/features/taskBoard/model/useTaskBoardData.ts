import { useEffect, useState } from "react";
import { useLoader } from "@/shared";
import { getTasks, getTags, Column, Tag, Task } from "@/features/taskBoard";

export function useTaskBoardData(initialColumns: Column[] = []) {
  const [columns, setColumns] = useState<Column[]>(initialColumns);
  const [tags, setTags] = useState<Tag[]>([]);
  const { show, hide } = useLoader();

  const fetchTasks = async () => {
    show();
    try {
      const [tasksRaw, newTags] = await Promise.all([getTasks(), getTags()]);
      const tasks = Array.isArray(tasksRaw) ? tasksRaw : [];
      const updatedColumns = initialColumns.map((column) => ({
        ...column,
        tasks: (tasks || []).filter((task: Task) => task.status === column.id),
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
