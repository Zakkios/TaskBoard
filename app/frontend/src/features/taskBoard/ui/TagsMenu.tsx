import { useState } from "react";
import { BiPlus } from "react-icons/bi";
import { MdBookmarkAdd, MdKeyboardArrowDown } from "react-icons/md";
import { Menu, MenuItem } from "@mui/material";
import { Button, useLoader } from "@/shared";
import {
  TagModal,
  closeTagModal,
  openEditTagModal,
  openCreateTagModal,
  deleteTag,
  updateTag,
  createTag,
  Tag,
  tagSchema,
} from "@/features/taskBoard";

interface TagsMenuProps {
  tags: Tag[];
  fetchTasks: () => Promise<void>;
}

export function TagsMenu({ tags = [], fetchTasks }: TagsMenuProps) {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [name, setName] = useState<string>("");
  const [color, setColor] = useState<string>("");
  const [error, setError] = useState<string | null>(null);
  const [tagId, setTagId] = useState<string>("");
  const { show, hide } = useLoader();

  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleDeleteTag = async (id: string) => {
    if (isSubmitting) return;
    setIsSubmitting(true);
    if (!confirm("Êtes-vous sûr de vouloir supprimer ce tag ?")) {
      return;
    }
    show();
    try {
      await deleteTag(id);
      await fetchTasks();
      closeTagModal({
        setIsModalOpen,
        setName,
        setColor,
        setError,
        setTagId,
        hide,
      });
    } catch (error) {
      setError("Erreur lors de la suppression.");
      console.error(error);
    } finally {
      setIsSubmitting(false);
      hide();
    }
  };

  const handleSubmit = async () => {
    if (isSubmitting) return;
    setIsSubmitting(true);
    show();
    setError(null);

    const result = tagSchema.safeParse({ name, color });
    if (!result.success) {
      const message = result.error.errors[0]?.message || "Données invalides.";
      setError(message);
      setIsSubmitting(false);
      hide();
      return;
    }

    try {
      if (tagId !== "") {
        await updateTag(tagId, { name, color });
      } else {
        await createTag({ name, color });
      }
      await fetchTasks();
      closeTagModal({
        setIsModalOpen,
        setName,
        setColor,
        setError,
        setTagId,
        hide,
      });
    } catch (error) {
      setError("Erreur lors de la sauvegarde.");
      console.error(error);
    } finally {
      setIsSubmitting(false);
      hide();
    }
  };

  return (
    <>
      <div className="flex">
        <Button
          id="handle-tags-button"
          aria-controls={open ? "tags-menu" : undefined}
          aria-haspopup="true"
          aria-expanded={open ? "true" : undefined}
          onClick={handleClick}
          className="flex gap-1 bg-white items-center border border-[#DEDEDE]  text-tertiary p-1.5 rounded-lg cursor-pointer"
        >
          <MdBookmarkAdd size={20} />
          Étiquettes <MdKeyboardArrowDown size={22} />
        </Button>
        <Menu
          id="tags-menu"
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
        >
          <MenuItem
            onClick={() => {
              openCreateTagModal({ setIsModalOpen });
              handleClose();
            }}
          >
            <div className="flex gap-1">
              <BiPlus size={20} />
              Créer une étiquette
            </div>
          </MenuItem>
          {tags.length > 0 && (
            <div className="flex items-center w-full my-2">
              <div className="flex-grow h-px bg-tertiary" />
              <span className="mx-4 text-sm text-tertiary font-medium">
                Éditer
              </span>
              <div className="flex-grow h-px bg-tertiary" />
            </div>
          )}

          {tags.map((tag) => (
            <div
              key={tag.id}
              style={{
                color: `#${tag.color}`,
                backgroundColor: `#${tag.color}20`,
              }}
            >
              <MenuItem
                onClick={() => {
                  openEditTagModal({
                    setIsModalOpen,
                    setName,
                    setColor,
                    setTagId,
                    tag,
                  });
                  handleClose();
                }}
              >
                <div className="flex items-baseline gap-1">{tag.name}</div>
              </MenuItem>
            </div>
          ))}
        </Menu>
      </div>
      <TagModal
        isModalOpen={isModalOpen}
        closeTagModal={() => {
          closeTagModal({
            setIsModalOpen,
            setName,
            setColor,
            setError,
            setTagId,
            hide,
          });
        }}
        handleSubmit={(e: React.FormEvent<HTMLFormElement>) => {
          e.preventDefault();
          handleSubmit();
        }}
        setName={setName}
        setColor={setColor}
        name={name}
        color={color}
        tagId={tagId}
        error={error ?? undefined}
        handleDeleteTag={handleDeleteTag}
      />
    </>
  );
}
