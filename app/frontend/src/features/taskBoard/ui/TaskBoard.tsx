import { useEffect, useState, useCallback } from "react";
import TaskColumn from "@/features/taskBoard/ui/TaskColumn";
import { Task } from "@/features/taskBoard/model/Task";
import { Column } from "@/features/taskBoard/model/Columns";
import { getTasks } from "@/features/taskBoard/api/task.api";

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
    <div className="flex gap-8 px-6 overflow-auto w-full">
      {columns.map((column: Column) => (
        <TaskColumn
          key={column.id}
          column={column}
          className="bg-light-gray rounded-3xl p-8 min-h-[85vh] min-w-[300px] max-w-[500px] w-full"
          refreshTasks={fetchTasks}
        />
      ))}
    </div>
  );
}
