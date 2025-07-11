import { Dispatch, SetStateAction } from "react";
import { Tag } from "@/features/taskBoard";

export function openCreateTagModal({
  setIsModalOpen,
}: {
  setIsModalOpen: Dispatch<SetStateAction<boolean>>;
}) {
  setIsModalOpen(true);
}

export function openEditTagModal({
  setIsModalOpen,
  setName,
  setColor,
  setTagId,
  tag,
}: {
  setIsModalOpen: Dispatch<SetStateAction<boolean>>;
  setName: Dispatch<SetStateAction<string>>;
  setColor: Dispatch<SetStateAction<string>>;
  setTagId: Dispatch<SetStateAction<string>>;
  tag: Tag;
}) {
  setIsModalOpen(true);
  setName(tag.name);
  setColor(tag.color);
  setTagId(tag.id);
}

export function closeTagModal({
  setIsModalOpen,
  setName,
  setColor,
  setError,
  setTagId,
  hide,
}: {
  setIsModalOpen: Dispatch<SetStateAction<boolean>>;
  setName: Dispatch<SetStateAction<string>>;
  setColor: Dispatch<SetStateAction<string>>;
  setError: Dispatch<SetStateAction<string | null>>;
  setTagId: Dispatch<SetStateAction<string>>;
  hide: () => void;
}) {
  setIsModalOpen(false);
  setName("");
  setColor("");
  setError(null);
  setTagId("");
  hide();
}
