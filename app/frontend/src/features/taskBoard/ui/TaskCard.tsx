import React from "react";
import { Task } from "@/features/taskBoard/model/Task";

interface TaskCardProps {
  task: Task;
}

const TaskCard: React.FC<TaskCardProps> = ({ task }) => (
  <div className="task-card">
    <div className="tags">
      {task.tags.map((tag) => (
        <span key={tag} className={`tag tag-${tag.toLowerCase()}`}>
          {tag}
        </span>
      ))}
    </div>
    <div className="title">{task.title}</div>
    <div className="description">{task.description}</div>
  </div>
);

export default TaskCard;
