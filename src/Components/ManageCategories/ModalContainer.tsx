import { ReactNode } from "react";

interface Props {
  isOpen: boolean;
  children: ReactNode;
}

const ModalContainer = ({ isOpen, children }: Props) => {
  if (!isOpen) return null;

  return <div className="modal-container">{children}</div>;
};

export default ModalContainer;
