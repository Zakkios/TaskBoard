import { ReactNode } from "react";

export interface ModalProps {
  children: ReactNode;
  isModalOpen: boolean;
  className?: string;
  closeModal: () => void;
}
