import { Dispatch, SetStateAction, useState } from "react";
import { BsThreeDots } from "react-icons/bs";
import { Menu, MenuItem, IconButton } from "@mui/material";
import {
  Task,
  TaskStatus,
  useTask,
  openEditTaskModal,
} from "@/features/taskBoard";

interface TaskCardProps {
  task: Task;
  refreshTasks: () => void;
  editTaskModalProps: {
    setIsModalOpen: Dispatch<SetStateAction<boolean>>;
    setStatus: Dispatch<SetStateAction<TaskStatus>>;
    setTitle: Dispatch<SetStateAction<string>>;
    setDescription: Dispatch<SetStateAction<string>>;
    setTagsIds: Dispatch<SetStateAction<string[]>>;
    setTaskId: Dispatch<SetStateAction<string>>;
  };
}

export function TaskCard({
  task,
  refreshTasks,
  editTaskModalProps,
}: TaskCardProps) {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const { handleDelete } = useTask();

  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div className="bg-white rounded-2xl p-4 mb-4 max-h-60">
      <div className="flex justify-between">
        <div className="flex flex-wrap">
          {task.tags.map((tag) => (
            <p
              key={tag.id}
              className="px-1 rounded mr-1 my-1 max-h-fit"
              style={{
                color: `#${tag.color}`,
                backgroundColor: `#${tag.color}20`,
              }}
            >
              {tag.name}
            </p>
          ))}
        </div>
        <div>
          <IconButton
            color="inherit"
            id="handle-task-button"
            aria-controls={open ? "handle-task-menu" : undefined}
            aria-haspopup="true"
            aria-expanded={open ? "true" : undefined}
            onClick={handleClick}
          >
            <BsThreeDots size={24} />
          </IconButton>
          <Menu
            id="handle-task-menu"
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            slotProps={{
              list: {
                "aria-labelledby": "handle-task-button",
              },
            }}
          >
            <MenuItem
              onClick={() => {
                openEditTaskModal({
                  setIsModalOpen: editTaskModalProps.setIsModalOpen,
                  setStatus: editTaskModalProps.setStatus,
                  setTitle: editTaskModalProps.setTitle,
                  setDescription: editTaskModalProps.setDescription,
                  setTagsIds: editTaskModalProps.setTagsIds,
                  setTaskId: editTaskModalProps.setTaskId,
                  task: {
                    status: task.status,
                    title: task.title,
                    description: task.description,
                    tagsIds: task.tags.map((tag) => tag.id),
                    taskId: task.id,
                  },
                });
                handleClose();
              }}
            >
              Éditer
            </MenuItem>
            <MenuItem
              onClick={() => {
                handleDelete(task.id, handleClose, refreshTasks);
              }}
            >
              Supprimer
            </MenuItem>
          </Menu>
        </div>
      </div>
      <div className="text-2xl">{task.title}</div>
      <div className="line-clamp-3">{task.description}</div>
    </div>
  );
}
