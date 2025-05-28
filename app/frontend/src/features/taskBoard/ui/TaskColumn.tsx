import React from "react";
import { Column } from "@/features/taskBoard/model/Task";
import TaskCard from "@/features/taskBoard/ui/TaskCard";
import clsx from "clsx";
import colorMap from "@/shared/lib/theme/colorMap";

interface TaskColumnProps {
  column: Column;
  className?: string;
}

const TaskColumn: React.FC<TaskColumnProps> = ({ column, className }) => (
  <div className={className}>
    <div className="flex items-center gap-3 mb-4">
      <div
        className={clsx(
          "w-[10px] h-[10px] rounded-full",
          colorMap[column.color]
        )}
      />{" "}
      <p>{column.title}</p>
    </div>
    <div className="border-2 rounded-full my-5 border-secondary"></div>
    <div>
      {column.tasks.map((task) => (
        <TaskCard key={task.id} task={task} />
      ))}
    </div>
  </div>
);

export default TaskColumn;
