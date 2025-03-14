import { useState } from "react";
import ModalContainer from "../Modal/ModalContainer";
import BudgetModal from "./BudgetModal";
import { Budget } from "../../types";

interface Props {
  typeFilter: string;
  handleDelete: (id: string) => void;
  dataTable: Budget[];
}

const BudgetButton = ({ typeFilter, handleDelete, dataTable }: Props) => {
  const [budgetIsOpen, setBudgetIsOpen] = useState(false);

  return (
    <>
      <div className="manage-section">
        <h1>
          Resultados
          {typeFilter === "" ? " generales" : " " + typeFilter + "s"}
        </h1>
        {typeFilter !== "" && (
          <button
            className="btn-open-modal"
            onClick={() => setBudgetIsOpen(true)}
          >
            GESTIONAR PRESUPUESTO
          </button>
        )}
      </div>
      <div className="presupuesto">
        {/* Componente con el modal para gestionar los presupuestos */}
        <ModalContainer
          titulo={`Presupuesto de ${typeFilter + "s"}`}
          isOpen={budgetIsOpen}
          setIsOpen={setBudgetIsOpen}
        >
          <BudgetModal
            typeFilter={typeFilter}
            handleDelete={handleDelete}
            dataTable={dataTable}
          />
        </ModalContainer>
      </div>
    </>
  );
};

export default BudgetButton;
