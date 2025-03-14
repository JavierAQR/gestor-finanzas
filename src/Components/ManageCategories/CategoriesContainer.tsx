import { useState } from "react";
import ModalContainer from "../Modal/ModalContainer";
import CategoriesLayout from "./CategoriesLayout";

const ManageCategories = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="manage-section">
      <h1>Ingresar Transacción</h1>
      <button onClick={() => setIsModalOpen(true)} className="btn-open-modal">
        GESTIONAR CATEGORÍAS
      </button>
      <ModalContainer
        isOpen={isModalOpen}
        setIsOpen={setIsModalOpen}
        titulo="Categorías"
      >
        <CategoriesLayout />
      </ModalContainer>
    </div>
  );
};

export default ManageCategories;
