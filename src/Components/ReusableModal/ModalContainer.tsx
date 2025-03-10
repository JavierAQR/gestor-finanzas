import { Dispatch, ReactNode, SetStateAction } from "react";
import "./Styles.css";

interface Props {
  isOpen: boolean;
  children: ReactNode;
  titulo?: string;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
}

const ModalContainer = ({ isOpen, children, titulo, setIsOpen }: Props) => {
  if (!isOpen) return null;

  return (
    <div className="modal-container">
      <div className="modal">
        <button onClick={() => setIsOpen(false)} className="btn-cerrar">
          <i className="fa-solid fa-xmark"></i>
        </button>
        <h1>{titulo}</h1>
        {children}
      </div>
    </div>
  );
};

export default ModalContainer;
