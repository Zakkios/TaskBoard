import { useState } from "react";
import { useLoader } from "@/shared";
import {
  taskSchema,
  TaskFormData,
  TaskStatus,
  createTask,
  deleteTask,
  updateTask,
  closeTaskModal,
} from "@/features/taskBoard";

export function useTask() {
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { show, hide } = useLoader();

  const submit = async (
    title: string,
    description: string,
    status: TaskStatus,
    tagsIds: string[],
    taskId: string,
    setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>,
    setTitle: React.Dispatch<React.SetStateAction<string>>,
    setDescription: React.Dispatch<React.SetStateAction<string>>,
    setStatus: React.Dispatch<React.SetStateAction<TaskStatus>>,
    setTagsIds: React.Dispatch<React.SetStateAction<string[]>>,
    setTaskId: React.Dispatch<React.SetStateAction<string>>,
    refreshTasks: () => void
  ) => {
    if (isSubmitting) return;
    setIsSubmitting(true);

    show();
    setError(null);
    const task: TaskFormData = {
      title: title,
      description: description,
      status: status,
      tags: tagsIds,
    };

    const result = taskSchema.safeParse({
      title,
      description,
      status,
      tagsIds,
    });
    if (!result.success) {
      const message = result.error.errors[0]?.message || "Données invalides.";
      setError(message);
      hide();
      setIsSubmitting(false);
      return;
    }

    if (taskId !== "") {
      try {
        await updateTask(taskId, task);
        refreshTasks();
        closeTaskModal({
          setIsModalOpen,
          setTitle,
          setDescription,
          setStatus,
          setTagsIds,
          setTaskId,
          setError,
          hide,
        });
      } catch (error) {
        console.error("Error updating task:", error);
      } finally {
        setIsSubmitting(false);
      }
      return;
    }

    try {
      await createTask(task);
      refreshTasks();
      closeTaskModal({
        setIsModalOpen,
        setTitle,
        setDescription,
        setStatus,
        setTagsIds,
        setTaskId,
        setError,
        hide,
      });
    } catch (error) {
      console.error(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async (
    taskId: string,
    handleClose: () => void,
    refreshTasks: () => void
  ) => {
    handleClose();
    if (!taskId) {
      setError("Task ID is required for deletion.");
      return;
    }
    if (!confirm("Êtes-vous sûr de vouloir supprimer cette tâche ?")) {
      return;
    }
    show();
    try {
      await deleteTask(taskId);
      refreshTasks();
    } catch (error) {
      setError("Erreur lors de la suppression de la tâche.");
      console.error(error);
    } finally {
      hide();
    }
  };

  return { submit, handleDelete, error, setError };
}
