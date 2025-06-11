import { TaskColumn, Column, useTaskBoardData } from "@/features/taskBoard";
import { TagsMenu } from "@/features/taskBoard";

interface TaskBoardProps {
  initialColumns: Column[];
}

export function TaskBoard({ initialColumns }: TaskBoardProps) {
  const { columns, tags, fetchTasks } = useTaskBoardData(initialColumns);

  return (
    <>
      <TagsMenu tags={tags} fetchTasks={fetchTasks} />
      <div className="flex gap-8 overflow-auto w-full">
        {columns.map((column: Column) => (
          <TaskColumn
            key={column.id}
            column={column}
            className="bg-light-gray rounded-3xl p-8 min-h-[80vh] min-w-[300px] max-w-[500px] w-full"
            refreshTasks={fetchTasks}
            tags={tags}
          />
        ))}
      </div>
    </>
  );
}
