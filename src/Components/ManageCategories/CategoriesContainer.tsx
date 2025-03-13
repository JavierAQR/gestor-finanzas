import { useState } from "react";
import ModalContainer from "../ReusableModal/ModalContainer";
import CategoriesLayout from "./CategoriesLayout";
import { categoryInputs } from "../../types";
import { useCategoryStore } from "../../store/category";

const CategoriesContainer = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const addNewCategory = useCategoryStore((state) => state.addNewCategory)

  const handleAddCategory = (data: categoryInputs) => {
    addNewCategory(data);
  };

  return (
    <div className="manage-categories">
      <h1>Ingresar Transacción</h1>
      <button onClick={() => setIsModalOpen(true)} className="btn-categorias">
        GESTIONAR CATEGORÍAS
      </button>
      <ModalContainer
        isOpen={isModalOpen}
        setIsOpen={setIsModalOpen}
        titulo="Categorías"
      >
        <CategoriesLayout handleAddCategory={handleAddCategory} />
      </ModalContainer>
    </div>
  );
};

export default CategoriesContainer;
