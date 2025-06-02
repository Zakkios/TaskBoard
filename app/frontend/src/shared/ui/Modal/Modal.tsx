import clsx from "clsx";
import { ModalProps } from "./Modal.types";
import Button from "../Button/Button";
import { RxCross2 } from "react-icons/rx";

export default function Modal({
  children,
  isModalOpen,
  className,
  closeModal,
}: ModalProps) {
  if (!isModalOpen) return null;

  return (
    <div
      className={clsx(
        "fixed inset-0 flex items-center justify-center bg-white/70 z-50",
        className
      )}
      onClick={closeModal}
    >
      <div
        className="bg-white rounded-lg p-6 w-full max-w-md relative"
        onClick={(e) => e.stopPropagation()}
        style={{ boxShadow: "0px 0px 15px rgba(0,0,0,0.4)" }}
      >
        <Button
          className="absolute top-3 right-3 cursor-pointer"
          onClick={closeModal}
        >
          <RxCross2 size={24} />
        </Button>
        <h2 className="text-xl font-bold mb-4">Titre de la modal</h2>
        <div className="mb-4">{children}</div>
      </div>
    </div>
  );
}
