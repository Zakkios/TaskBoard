import { Dispatch, SetStateAction, useState } from "react";
import Select from "react-select";
import { Modal, Input, Button, reactSelectCustomStyles } from "@/shared";
import { COLUMNS, Tag, TaskStatus } from "@/features/taskBoard";

interface TaskModalProps {
  isModalOpen: boolean;
  closeTaskModal: () => void;
  addTask: (e: React.FormEvent<HTMLFormElement>) => void;
  tags: Tag[];
  setTitle: Dispatch<SetStateAction<string>>;
  setDescription: Dispatch<SetStateAction<string>>;
  setStatus: Dispatch<SetStateAction<TaskStatus>>;
  setTagsIds: Dispatch<SetStateAction<string[]>>;
  taskId?: string;
  title?: string;
  description?: string;
  status?: TaskStatus;
  tagsIds?: string[];
  error?: string;
}

export function TaskModal({
  isModalOpen,
  closeTaskModal,
  addTask,
  tags,
  setTitle,
  setDescription,
  setStatus,
  setTagsIds,
  taskId = "",
  title = "",
  description = "",
  status = "todo",
  tagsIds = [],
  error = "",
}: TaskModalProps) {
  const [maxTagsError, setMaxTagsError] = useState(false);

  return (
    <Modal isModalOpen={isModalOpen} closeModal={closeTaskModal}>
      <form className="flex flex-col" onSubmit={addTask}>
        <Input
          type="text"
          name="title"
          value={title}
          placeholder="Titre de la tâche"
          classNameParent="w-full"
          className="mb-3"
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <textarea
          name="description"
          placeholder="Description de la tâche"
          value={description}
          className="w-full h-32 p-2 border border-gray-400 bg-white rounded-lg mb-3 focus:outline-none focus:ring-1 focus:ring-gray-500"
          onChange={(e) => setDescription(e.target.value)}
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
          {maxTagsError && (
            <div className="text-sm text-red-500 pb-1">
              Vous ne pouvez pas sélectionner plus de 5 étiquettes.
            </div>
          )}
          <Select
            isMulti
            options={tags.map((tag) => ({
              value: tag.id,
              label: tag.name,
              color: tag.color,
            }))}
            styles={reactSelectCustomStyles}
            onChange={(selectedOptions) => {
              if (selectedOptions && selectedOptions.length > 5) {
                setMaxTagsError(true);
                return;
              }
              setMaxTagsError(false);
              if (selectedOptions) {
                setTagsIds(selectedOptions.map((option) => option.value));
              } else {
                setTagsIds([]);
              }
            }}
            value={tags
              .map((tag) => ({
                value: tag.id,
                label: tag.name,
                color: tag.color,
              }))
              .filter((tag) => tagsIds.includes(tag.value))}
          />
        </label>

        <Button type="submit" variant="secondary">
          {taskId ? "Modifier la tâche" : "Ajouter une tâche"}
        </Button>
        {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
        <Input
          type="hidden"
          name="taskId"
          value={taskId}
          classNameParent="hidden"
          className="hidden"
        />
      </form>
    </Modal>
  );
}
