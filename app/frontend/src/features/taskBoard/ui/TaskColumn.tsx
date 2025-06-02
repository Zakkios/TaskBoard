import reactSelectCustomStyles from "@/shared/lib/theme/reactSelectCustomStyles";
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
import Modal from "@/shared/ui/Modal/Modal";
import Input from "@/shared/ui/Input/Input";
import { getTags } from "../api/tag.api";
import { Tag } from "../model/Tags";
import Select from "react-select";
import clsx from "clsx";
import COLUMNS from "../config/columns";
import { createTask } from "../api/task.api";

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

  function openModal(): void {
    setIsModalOpen(true);
    setStatus(column.id);
  }

  function closeModal(): void {
    setIsModalOpen(false);
    setTitle("");
    setDescription("");
    setStatus(status);
    setTagsIds([]);
  }

  const addTask = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);
    const task: TaskFormData = {
      title: title,
      description: description,
      status: status,
      tags: tagsIds,
    };
    try {
      await createTask(task);
      refreshTasks();
      closeModal();
      setTitle("");
      setDescription("");
      setStatus("todo");
      setTagsIds([]);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
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
          <TaskCard key={task.id} task={task} />
        ))}
      </div>
      <div>
        <Button variant="secondary" onClick={openModal} disabled={loading}>
          Ajouter une tâche
        </Button>
      </div>
      <Modal isModalOpen={isModalOpen} closeModal={closeModal}>
        <form className="flex flex-col" onSubmit={addTask}>
          <Input
            type="text"
            name="title"
            placeholder="Titre de la tâche"
            classNameParent="w-full"
            className="mb-3"
            onChange={(e) => setTitle(e.target.value)}
            disabled={loading}
            required
          />
          <Input
            type="text"
            name="description"
            placeholder="Description de la tâche"
            classNameParent="w-full"
            className="mb-3"
            onChange={(e) => setDescription(e.target.value)}
            disabled={loading}
            required
          />
          <label className="mb-3">
            État de la tâche :
            <Select
              options={COLUMNS.map((col) => ({
                value: col.id,
                label: col.title,
              }))}
              value={COLUMNS.map((col) => ({
                value: col.id,
                label: col.title,
              })).find((opt) => opt.value === status)}
              onChange={(selectedOption) => {
                if (selectedOption) {
                  setStatus(selectedOption.value);
                } else {
                  return;
                }
              }}
              required
            />
          </label>
          <label className="mb-3">
            Étiquettes :
            <Select
              isMulti
              options={tags.map((tag) => {
                return {
                  value: tag.id,
                  label: tag.name,
                  color: tag.color,
                };
              })}
              styles={reactSelectCustomStyles}
              onChange={(selectedOptions) => {
                if (selectedOptions) {
                  const selectedTagsIds: string[] = selectedOptions.map(
                    (selectedOption) => {
                      return selectedOption.value;
                    }
                  );
                  setTagsIds(selectedTagsIds);
                } else {
                  return;
                }
              }}
            />
          </label>
          <Button
            type="submit"
            variant={loading ? "disabled" : "secondary"}
            className=""
            disabled={loading}
          >
            {loading ? "Ajout de la tâche..." : "Ajouter"}
          </Button>
        </form>
      </Modal>
    </div>
  );
}
