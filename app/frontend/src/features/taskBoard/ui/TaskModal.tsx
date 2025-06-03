import Select from "react-select";
import { Dispatch, SetStateAction } from "react";
import Modal from "@/shared/ui/Modal/Modal";
import Input from "@/shared/ui/Input/Input";
import Button from "@/shared/ui/Button/Button";
import reactSelectCustomStyles from "@/shared/lib/theme/reactSelectCustomStyles";
import COLUMNS from "@/features/taskBoard/consts/columns";
import { Tag } from "@/features/taskBoard/model/Tags";
import { TaskStatus } from "@/features/taskBoard/model/Task";

interface TaskModalProps {
  isModalOpen: boolean;
  closeModal: () => void;
  addTask: (e: React.FormEvent<HTMLFormElement>) => void;
  tags: Tag[];
  loading: boolean;
  setTitle: Dispatch<SetStateAction<string>>;
  setDescription: Dispatch<SetStateAction<string>>;
  setStatus: Dispatch<SetStateAction<TaskStatus>>;
  setTagsIds: Dispatch<SetStateAction<string[]>>;
  taskId?: string;
  title?: string;
  description?: string;
  status?: TaskStatus;
  tagsIds?: string[];
}

export default function TaskModal({
  isModalOpen,
  closeModal,
  addTask,
  tags,
  loading,
  setTitle,
  setDescription,
  setStatus,
  setTagsIds,
  taskId = "",
  title = "",
  description = "",
  status = "todo",
  tagsIds = [],
}: TaskModalProps) {
  return (
    <Modal isModalOpen={isModalOpen} closeModal={closeModal}>
      <form className="flex flex-col" onSubmit={addTask}>
        <Input
          type="text"
          name="title"
          value={title}
          placeholder="Titre de la tâche"
          classNameParent="w-full"
          className="mb-3"
          onChange={(e) => setTitle(e.target.value)}
          disabled={loading}
          required
        />
        <textarea
          name="description"
          placeholder="Description de la tâche"
          value={description}
          className="w-full h-32 p-2 border border-gray-400 bg-white rounded-lg mb-3 focus:outline-none focus:ring-1 focus:ring-gray-500"
          onChange={(e) => setDescription(e.target.value)}
          disabled={loading}
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
            value={tags
              .map((tag) => {
                return {
                  value: tag.id,
                  label: tag.name,
                  color: tag.color,
                };
              })
              .filter((tag) => tagsIds.includes(tag.value))}
          />
        </label>
        <Button
          type="submit"
          variant={loading ? "disabled" : "secondary"}
          className=""
          disabled={loading}
        >
          {loading
            ? "Chargement..."
            : taskId
            ? "Modifier la tâche"
            : "Ajouter une tâche"}
        </Button>
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
