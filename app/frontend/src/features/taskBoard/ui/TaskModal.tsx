import Select from "react-select";
import { Dispatch, SetStateAction } from "react";
import Modal from "@/shared/ui/Modal/Modal";
import Input from "@/shared/ui/Input/Input";
import Button from "@/shared/ui/Button/Button";
import reactSelectCustomStyles from "@/shared/lib/theme/reactSelectCustomStyles";
import COLUMNS from "@/features/taskBoard/config/columns";
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
}: TaskModalProps) {
  return (
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
        <textarea
          name="description"
          placeholder="Description de la tâche"
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
  );
}
