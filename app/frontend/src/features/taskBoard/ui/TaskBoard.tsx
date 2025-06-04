import TaskColumn from "@/features/taskBoard/ui/TaskColumn";
import { Column } from "@/features/taskBoard/model/Columns";
import useTaskBoardData from "@/features/taskBoard/model/useTaskBoardData";

interface TaskBoardProps {
  initialColumns: Column[];
}

export default function TaskBoard({ initialColumns }: TaskBoardProps) {
  const { columns, tags, fetchTasks } = useTaskBoardData(initialColumns);

  return (
    <div className="flex gap-8 px-6 overflow-auto w-full">
      {columns.map((column: Column) => (
        <TaskColumn
          key={column.id}
          column={column}
          className="bg-light-gray rounded-3xl p-8 min-h-[85vh] min-w-[300px] max-w-[500px] w-full"
          refreshTasks={fetchTasks}
          tags={tags}
        />
      ))}
    </div>
  );
}
