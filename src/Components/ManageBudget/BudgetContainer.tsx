import { useState } from "react";
import ModalContainer from "../ManageCategories/ModalContainer";
import BudgetLayout from "./BudgetLayout";
import { budgetForm } from "../../context/reducerBudget";
import { useBudgetContext } from "../../context/BudgetContext";
import { useMonthContext } from "../../context/MonthContext";
import { useDataContext } from "../../context/TransactionContext";

interface Props {
  typeSelected: string;
  categoryFilter: string;
  montoTotal: number;
}

const BudgetContainer = ({
  typeSelected,
  categoryFilter,
  montoTotal,
}: Props) => {
  const [budgetIsOpen, setBudgetIsOpen] = useState(false);
  const { monthSelected } = useMonthContext();
  const { budget, setBudget } = useBudgetContext();

  const { categoryArray } = useDataContext();

  const buscarTipo = (category: string) => {
    const categoria = categoryArray.find((item) => item.name === category);
    if (categoria) {
      return categoria?.type;
    } else {
      return "";
    }
  };

  const handleAddBudget = (data: budgetForm) => {
    setBudget({
      type: "ADD",
      payload: {
        budget: data.budget,
        category: data.category,
        type: buscarTipo(data.category),
        date: monthSelected,
      },
    });
  };

  const obtenerBudgetTable = (tipo: string) =>
    budget.filter((item) => item.type === tipo && item.date === monthSelected);

  const dataTable = obtenerBudgetTable(typeSelected);

  const tituloPresupuesto =
    categoryFilter === "" ? typeSelected + "s" : categoryFilter;

  const presupuestoActual = dataTable.find(
    (item) => item.category === categoryFilter
  );

  const mostrarPresupuesto =
    presupuestoActual !== undefined ? (
      <span> S/ {presupuestoActual.budget}</span>
    ) : (
      <span>Sin presupuesto.</span>
    );

  return (
    <>
      <div className="presupuesto">
        <div className="total presupuesto">
          <button onClick={() => setBudgetIsOpen(true)}>
            Gestionar Presupuesto
          </button>
          <h4>Presupuesto {tituloPresupuesto}</h4>
          <span>{mostrarPresupuesto}</span>
        </div>
        <ModalContainer isOpen={budgetIsOpen}>
          <BudgetLayout
            closeModal={() => setBudgetIsOpen(false)}
            typeSelected={typeSelected}
            handleAddBudget={handleAddBudget}
            dataTable={dataTable}
          />
        </ModalContainer>
      </div>
      {presupuestoActual !== undefined && (
        <div className={`total`}>
          <h4>Restante</h4>
          <span>S/ {montoTotal - presupuestoActual.budget}</span>
        </div>
      )}
    </>
  );
};

export default BudgetContainer;
