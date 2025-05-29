import TaskColumn from "@/features/taskBoard/ui/TaskColumn";
import { Column, Task } from "@/features/taskBoard/model/Task";
import { getTasks } from "@/features/taskBoard/api/task.api";
import { useEffect, useState, useCallback } from "react";

interface TaskBoardProps {
  columns: Column[];
}

export default function TaskBoard({ columns: initialColumns }: TaskBoardProps) {
  const [columns, setColumns] = useState<Column[]>(initialColumns);

  const fetchTasks = useCallback(async () => {
    try {
      const tasks = await getTasks();
      const updatedColumns = initialColumns.map((column) => ({
        ...column,
        tasks: tasks.filter((task: Task) => task.status === column.id),
      }));
      setColumns(updatedColumns);
    } catch (error) {
      console.error("Error fetching tasks:", error);
      setColumns(initialColumns);
    }
  }, [initialColumns]);

  useEffect(() => {
    fetchTasks();
  }, [fetchTasks]);

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 px-6">
      {columns.map((column: Column) => (
        <TaskColumn
          key={column.id}
          column={column}
          className="bg-light-gray rounded-3xl p-8 min-h-[85vh]"
        />
      ))}
    </div>
  );
}
