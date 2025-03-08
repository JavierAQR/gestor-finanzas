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
}

const BudgetContainer = ({ typeSelected, categoryFilter }: Props) => {
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

  //Falta pulir
  const obtenerPresupuesto = () => {
    if (categoryFilter === "") {
      return "Aqui va total";
    }
    const data = dataTable.find((item) => item.category === categoryFilter);
    if (data) {
      return data.budget;
    } else {
      return "Sin presupuesto";
    }
  };

  const tituloPresupuesto =
    categoryFilter === "" ? typeSelected + "s" : categoryFilter;

  return (
    <div className="presupuesto">
      <div className="total presupuesto">
        <button onClick={() => setBudgetIsOpen(true)}>
          Gestionar Presupuesto
        </button>
        <h4>Presupuesto {tituloPresupuesto}</h4>
        <span>{obtenerPresupuesto()}</span>
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
  );
};

export default BudgetContainer;
