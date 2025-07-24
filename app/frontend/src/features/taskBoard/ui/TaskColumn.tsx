import clsx from "clsx";
import { useState } from "react";
import { GoPlus } from "react-icons/go";
import { useLoader, Button, colorMap } from "@/shared";
import {
  Column,
  TaskCard,
  Task,
  TaskStatus,
  Tag,
  useTask,
  TaskModal,
  closeTaskModal,
  openCreateTaskModal,
} from "@/features/taskBoard";

interface TaskColumnProps {
  column: Column;
  className?: string;
  refreshTasks: () => void;
  tags: Tag[];
}

export function TaskColumn({
  column,
  className,
  refreshTasks,
  tags,
}: TaskColumnProps) {
  const { submit, error, setError } = useTask();
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [status, setStatus] = useState<TaskStatus>("todo");
  const [tagsIds, setTagsIds] = useState<string[]>([]);
  const [taskId, setTaskId] = useState<string>("");
  const { hide } = useLoader();

  const editTaskModalProps = {
    setIsModalOpen,
    setStatus,
    setTitle,
    setDescription,
    setTagsIds,
    setTaskId,
  };

  return (
    <div className={className}>
      <div className="flex items-center gap-3 mb-4">
        <div
          className={clsx(
            "w-[10px] h-[10px] rounded-full",
            colorMap[column.color]
          )}
        />{" "}
        <p className="whitespace-nowrap">{column.title}</p>
        <div className="border-1 w-full my-5 border-[#DBDBDB]"></div>
      </div>
      <div>
        {(column.tasks || []).map((task: Task) => (
          <TaskCard
            key={task.id}
            task={task}
            refreshTasks={refreshTasks}
            editTaskModalProps={editTaskModalProps}
          />
        ))}
      </div>
      <div className="justify-center flex">
        <Button
          variant="nav-item"
          onClick={() =>
            openCreateTaskModal({
              setIsModalOpen,
              setStatus,
              columnId: column.id,
            })
          }
          className="flex items-center gap-2"
        >
          Ajouter une tâche <GoPlus />
        </Button>
      </div>
      <TaskModal
        isModalOpen={isModalOpen}
        closeTaskModal={() => {
          closeTaskModal({
            setIsModalOpen,
            setTitle,
            setDescription,
            setStatus,
            setTagsIds,
            setTaskId,
            setError,
            hide,
          });
        }}
        addTask={(e) => {
          e.preventDefault();
          submit(
            title,
            description,
            status,
            tagsIds,
            taskId,
            setIsModalOpen,
            setTitle,
            setDescription,
            setStatus,
            setTagsIds,
            setTaskId,
            refreshTasks
          );
        }}
        tags={tags}
        setTitle={setTitle}
        setDescription={setDescription}
        setStatus={setStatus}
        setTagsIds={setTagsIds}
        taskId={taskId}
        title={title}
        description={description}
        status={status}
        tagsIds={tagsIds}
        error={error ?? undefined}
      />
    </div>
  );
}
