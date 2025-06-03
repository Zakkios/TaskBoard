import { useCallback, useEffect, useState } from "react";
import { Column } from "@/features/taskBoard/model/Columns";
import TaskCard from "@/features/taskBoard/ui/TaskCard";
import colorMap from "@/shared/lib/theme/colorMap";
import Button from "@/shared/ui/Button/Button";
import {
  Task,
  TaskStatus,
  TaskFormData,
} from "@/features/taskBoard/model/Task";
import { getTags } from "@/features/taskBoard/api/tag.api";
import { Tag } from "../model/Tags";
import clsx from "clsx";
import { createTask, updateTask } from "../api/task.api";
import TaskModal from "./TaskModal";
import { GoPlus } from "react-icons/go";
import {
  closeModal,
  openCreateTaskModal,
} from "@/features/taskBoard/lib/handleTaskModal";

interface TaskColumnProps {
  column: Column;
  className?: string;
  refreshTasks: () => void;
}

export default function TaskColumn({
  column,
  className,
  refreshTasks,
}: TaskColumnProps) {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [tags, setTags] = useState<Tag[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [status, setStatus] = useState<TaskStatus>("todo");
  const [tagsIds, setTagsIds] = useState<string[]>([]);
  const [taskId, setTaskId] = useState<string>("");

  const editTaskModalProps = {
    setIsModalOpen,
    setStatus,
    setTitle,
    setDescription,
    setTagsIds,
    setTaskId,
  };

  const fetchTags = useCallback(async () => {
    try {
      const newTags = await getTags();
      setTags(newTags);
    } catch (error) {
      console.error("Error fetching tasks:", error);
    }
  }, []);

  useEffect(() => {
    fetchTags();
  }, [fetchTags]);

  const addTask = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);
    const task: TaskFormData = {
      title: title,
      description: description,
      status: status,
      tags: tagsIds,
    };

    if (taskId !== "") {
      try {
        await updateTask(taskId, task);
        refreshTasks();
        closeModal({
          setIsModalOpen,
          setTitle,
          setDescription,
          setStatus,
          setTagsIds,
          setTaskId,
          setLoading,
        });
      } catch (error) {
        console.error("Error updating task:", error);
      }
      return;
    }

    try {
      await createTask(task);
      refreshTasks();
      closeModal({
        setIsModalOpen,
        setTitle,
        setDescription,
        setStatus,
        setTagsIds,
        setTaskId,
        setLoading,
      });
    } catch (error) {
      console.error(error);
    }
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
        <p>{column.title}</p>
      </div>
      <div className="border-2 rounded-full my-5 border-secondary"></div>
      <div>
        {column.tasks.map((task: Task) => (
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
          disabled={loading}
          className="flex items-center gap-2"
        >
          Ajouter une tâche <GoPlus />
        </Button>
      </div>
      <TaskModal
        isModalOpen={isModalOpen}
        closeModal={() => {
          closeModal({
            setIsModalOpen,
            setTitle,
            setDescription,
            setStatus,
            setTagsIds,
            setTaskId,
            setLoading,
          });
        }}
        addTask={addTask}
        tags={tags}
        loading={loading}
        setTitle={setTitle}
        setDescription={setDescription}
        setStatus={setStatus}
        setTagsIds={setTagsIds}
        taskId={taskId}
        title={title}
        description={description}
        status={status}
        tagsIds={tagsIds}
      />
    </div>
  );
}
