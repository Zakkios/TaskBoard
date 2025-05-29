import React from "react";
import { Task } from "@/features/taskBoard/model/Task";
import Button from "@/shared/ui/Button/Button";
import { BsThreeDots } from "react-icons/bs";

interface TaskCardProps {
  task: Task;
}

const TaskCard: React.FC<TaskCardProps> = ({ task }) => (
  <div className="bg-white rounded-2xl p-4 mb-4 max-h-60">
    <div className="flex justify-between">
      <div className="flex flex-wrap">
        {task.tags.map((tag) => (
          <p
            key={tag.id}
            className={`text-${tag.color} bg-${tag.color}/25 p-1 rounded mr-1 my-1`}
          >
            {tag.name}
          </p>
        ))}
      </div>
      <div>
        <Button>
          <BsThreeDots size={24} />
        </Button>
      </div>
    </div>
    <div className="text-2xl">{task.title}</div>
    <div className="line-clamp-3">{task.description}</div>
  </div>
);

export default TaskCard;
