import { useState } from "react";
import {
  TaskColumn,
  Column,
  useTaskBoardData,
  TagsFilter,
} from "@/features/taskBoard";
import { TagsMenu } from "@/features/taskBoard";

interface TaskBoardProps {
  initialColumns: Column[];
}

export function TaskBoard({ initialColumns = [] }: TaskBoardProps) {
  const { columns, tags, fetchTasks } = useTaskBoardData(initialColumns);
  const [selectedFiltersTags, setSelectedFiltersTags] = useState<string[]>([]);

  const filteredColumns = columns.map((column) => ({
    ...column,
    tasks:
      selectedFiltersTags.length === 0
        ? column.tasks
        : column.tasks.filter((task) =>
            task.tags.some((tag) => selectedFiltersTags.includes(tag.id))
          ),
  }));

  return (
    <>
      <div className="flex mb-4">
        <TagsFilter
          tags={tags}
          selectedFiltersTags={selectedFiltersTags}
          setSelectedFiltersTags={setSelectedFiltersTags}
        />
        <TagsMenu tags={tags} fetchTasks={fetchTasks} />
      </div>
      <div className="flex gap-8 overflow-auto w-full">
        {(filteredColumns || []).map((column: Column) => (
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
