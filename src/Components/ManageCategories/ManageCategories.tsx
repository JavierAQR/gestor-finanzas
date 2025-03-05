import { useState } from "react";
import "./styles.css";
import ModalContainer from "./ModalContainer";
import ModalLayout from "./ModalLayout";
import { useDataContext } from "../../context/TransactionContext";
import { categoryInputs } from "../../context/reducerCategories";

const ManageCategories = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { setCategoryArray } = useDataContext();

  const handlerAddCategory = (data: categoryInputs) => {
    setCategoryArray({
      type: "ADD",
      payload: {
        name: data.name,
        type: data.type,
      },
    });
  };

  return (
    <div className="manage-categories">
      <h1>Ingresar Transacción</h1>
      <button onClick={() => setIsModalOpen(true)} className="btn-categorias">
        GESTIONAR CATEGORÍAS
      </button>
      <ModalContainer isOpen={isModalOpen}>
        <ModalLayout
          closeModal={() => setIsModalOpen(false)}
          handlerAddCategory={handlerAddCategory}
        />
      </ModalContainer>
    </div>
  );
};

export default ManageCategories;
