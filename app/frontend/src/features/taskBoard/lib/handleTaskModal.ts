import { Dispatch, SetStateAction } from "react";
import { TaskStatus } from "@/features/taskBoard";

export function openCreateTaskModal({
  setIsModalOpen,
  setStatus,
  columnId,
}: {
  setIsModalOpen: Dispatch<SetStateAction<boolean>>;
  setStatus: Dispatch<SetStateAction<TaskStatus>>;
  columnId: TaskStatus;
}) {
  setIsModalOpen(true);
  setStatus(columnId);
}

export function openEditTaskModal({
  setIsModalOpen,
  setStatus,
  setTitle,
  setDescription,
  setTagsIds,
  setTaskId,
  task,
}: {
  setIsModalOpen: Dispatch<SetStateAction<boolean>>;
  setStatus: Dispatch<SetStateAction<TaskStatus>>;
  setTitle: Dispatch<SetStateAction<string>>;
  setDescription: Dispatch<SetStateAction<string>>;
  setTagsIds: Dispatch<SetStateAction<string[]>>;
  setTaskId: Dispatch<SetStateAction<string>>;
  task: {
    status: TaskStatus;
    title: string;
    description: string;
    tagsIds: string[];
    taskId: string;
  };
}) {
  setStatus(task.status);
  setTitle(task.title);
  setDescription(task.description);
  setTagsIds(task.tagsIds);
  setTaskId(task.taskId);
  setIsModalOpen(true);
}

export function closeTaskModal({
  setIsModalOpen,
  setTitle,
  setDescription,
  setStatus,
  setTagsIds,
  setTaskId,
  setError,
  hide,
}: {
  setIsModalOpen: Dispatch<SetStateAction<boolean>>;
  setTitle: Dispatch<SetStateAction<string>>;
  setDescription: Dispatch<SetStateAction<string>>;
  setStatus: Dispatch<SetStateAction<TaskStatus>>;
  setTagsIds: Dispatch<SetStateAction<string[]>>;
  setTaskId: Dispatch<SetStateAction<string>>;
  setError: Dispatch<SetStateAction<string | null>>;
  hide: () => void;
}): void {
  setIsModalOpen(false);
  setTitle("");
  setDescription("");
  setStatus("todo");
  setTagsIds([]);
  setTaskId("");
  setError(null);
  hide();
}
