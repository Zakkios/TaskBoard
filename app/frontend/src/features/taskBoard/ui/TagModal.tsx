import { Dispatch, SetStateAction } from "react";
import { Modal, Input, Button } from "@/shared";

interface TagModalProps {
  isModalOpen: boolean;
  closeTagModal: () => void;
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  setName: Dispatch<SetStateAction<string>>;
  setColor: Dispatch<SetStateAction<string>>;
  tagId?: string;
  name?: string;
  color?: string;
  error?: string;
  handleDeleteTag: (tagId: string) => void;
}

export function TagModal({
  isModalOpen,
  closeTagModal,
  handleSubmit,
  setName,
  setColor,
  tagId = "",
  name = "",
  color = "",
  error = "",
  handleDeleteTag,
}: TagModalProps) {
  const colorWithHash = color
    ? color.startsWith("#")
      ? color
      : `#${color}`
    : "#000000";

  const handleColorInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setColor(e.target.value.replace(/^#/, ""));
  };

  return (
    <Modal isModalOpen={isModalOpen} closeModal={closeTagModal}>
      <form className="flex flex-col" onSubmit={handleSubmit}>
        <Input
          type="text"
          name="name"
          value={name}
          placeholder="Nom de l'étiquette"
          classNameParent="w-full"
          className="mb-3"
          onChange={(e) => setName(e.target.value)}
          required
        />
        <div className="flex items-center mb-3 gap-3 w-full">
          <input
            type="color"
            value={colorWithHash}
            onChange={handleColorInput}
            style={{ width: 32, height: 32, padding: 0, border: "none" }}
            title="Choisir la couleur"
          />
          <Input
            type="text"
            name="color"
            value={color}
            placeholder="abcdef"
            maxLength={6}
            pattern="^[0-9a-fA-F]{6}$"
            classNameParent="w-full"
            onChange={(e) => {
              setColor(e.target.value.replace(/[^0-9a-fA-F]/g, "").slice(0, 6));
            }}
            required
          />
        </div>
        <div className="flex justify-center pb-4">
          <div
            className="px-1 rounded mr-1 my-1 max-h-fit"
            style={{
              color: colorWithHash,
              backgroundColor: `${colorWithHash}20`,
            }}
            title={colorWithHash}
          >
            {name}
          </div>
        </div>
        <div className="flex gap-5">
          <Button type="submit" variant="secondary" className="w-full">
            {tagId ? "Modifier" : "Ajouter une étiquette"}
          </Button>
          {tagId && (
            <Button
              type="button"
              variant="nav-item-active"
              className="w-full"
              onClick={() => handleDeleteTag(tagId)}
            >
              Supprimer
            </Button>
          )}
        </div>
        {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
        <Input
          type="hidden"
          name="tagId"
          value={tagId}
          classNameParent="hidden"
          className="hidden"
        />
      </form>
    </Modal>
  );
}
