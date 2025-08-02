import { Dispatch, SetStateAction } from "react";
import { Task, TaskStatus, openEditTaskModal } from "@/features/taskBoard";

interface TaskCardProps {
  task: Task;
  refreshTasks: () => void;
  editTaskModalProps: {
    setIsModalOpen: Dispatch<SetStateAction<boolean>>;
    setStatus: Dispatch<SetStateAction<TaskStatus>>;
    setTitle: Dispatch<SetStateAction<string>>;
    setDescription: Dispatch<SetStateAction<string>>;
    setTagsIds: Dispatch<SetStateAction<string[]>>;
    setTaskId: Dispatch<SetStateAction<string>>;
  };
}

export function TaskCard({ task, editTaskModalProps }: TaskCardProps) {
  return (
    <div
      className="bg-white rounded-2xl p-4 mb-4 max-h-60 border border-[#DBDBDB] hover:shadow-lg transition-shadow duration-200 group"
      onClick={() => {
        openEditTaskModal({
          setIsModalOpen: editTaskModalProps.setIsModalOpen,
          setStatus: editTaskModalProps.setStatus,
          setTitle: editTaskModalProps.setTitle,
          setDescription: editTaskModalProps.setDescription,
          setTagsIds: editTaskModalProps.setTagsIds,
          setTaskId: editTaskModalProps.setTaskId,
          task: {
            status: task.status,
            title: task.title,
            description: task.description,
            tagsIds: (task.tags || []).map((tag) => tag.id),
            taskId: task.id,
          },
        });
      }}
    >
      <div className="flex justify-between">
        <div className="flex flex-wrap">
          {(task.tags || []).map((tag) => (
            <p
              key={tag.id}
              className="px-1 rounded mr-1 my-1 max-h-fit"
              style={{
                color: `#${tag.color}`,
                backgroundColor: `#${tag.color}20`,
              }}
            >
              {tag.name}
            </p>
          ))}
        </div>
      </div>
      <div className="text-2xl">{task.title}</div>
      <div className="line-clamp-3">{task.description}</div>
    </div>
  );
}
