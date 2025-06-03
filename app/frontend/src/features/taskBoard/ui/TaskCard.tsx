import { Dispatch, SetStateAction, useState } from "react";
import { BsThreeDots } from "react-icons/bs";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import IconButton from "@mui/material/IconButton";
import { Task, TaskStatus } from "@/features/taskBoard/model/Task";
import { openEditTaskModal } from "../lib/handleTaskModal";
import { deleteTask } from "../api/task.api";
import Loader from "@/shared/ui/Loader/Loader";

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

export default function TaskCard({
  task,
  refreshTasks,
  editTaskModalProps,
}: TaskCardProps) {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleDelete = async () => {
    handleClose();
    setLoading(true);
    try {
      if (!task.id) {
        console.error("Task ID is required for deletion.");
        return;
      }
      if (!confirm("Êtes-vous sûr de vouloir supprimer cette tâche ?")) {
        return;
      }
      await deleteTask(task.id);
      refreshTasks();
    } catch (error) {
      console.error("Error confirming deletion:", error);
      return;
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-2xl p-4 mb-4 max-h-60">
      {loading && <Loader />}
      <div className="flex justify-between">
        <div className="flex flex-wrap">
          {task.tags.map((tag) => (
            <p
              key={tag.id}
              className="px-1 rounded mr-1 my-1"
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
            id="basic-button"
            aria-controls={open ? "basic-menu" : undefined}
            aria-haspopup="true"
            aria-expanded={open ? "true" : undefined}
            onClick={handleClick}
          >
            <BsThreeDots size={24} />
          </IconButton>
          <Menu
            id="basic-menu"
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            slotProps={{
              list: {
                "aria-labelledby": "basic-button",
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
            <MenuItem onClick={handleDelete}>Supprimer</MenuItem>
          </Menu>
        </div>
      </div>
      <div className="text-2xl">{task.title}</div>
      <div className="line-clamp-3">{task.description}</div>
    </div>
  );
}
