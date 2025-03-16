import { useFilterContext } from "../../context/FilterContext";
import { useMonthContext } from "../../context/MonthContext";
import { useBudgetStore } from "../../store/budget";
import { Transaction } from "../../types";
import BalanceTotal from "../TransactionBalance/BalanceTotal";
import BudgetButton from "./BudgetButton";

interface Props {
  selectedTable: Transaction[];
}

const ManageResults = ({ selectedTable }: Props) => {
  const budget = useBudgetStore((b) => b.budget);
  const deleteBudget = useBudgetStore((b) => b.deleteBudget);
  const { monthSelected, categoriasDelMes } = useMonthContext();
  const { typeFilter, categoryFilter } = useFilterContext();

  const handleDelete = (id: string) => {
    deleteBudget(id);
  };

  //Metodo para obtener la data de presupuestos que se pasará a la tabla. Se filtra de acuerdo al filtro de tipo seleccionado (ingreso-egreso);
  // Verifica si las categorias de los presupuestos tienen al menos 1 registro.
  // Si la categoría de un presupuesto ya no tiene registros, ese presupuesto se elimina.
  const obtenerBudgetTable = (tipo: string) => {
    const filteredItems = budget.filter(
      (item) => item.type === tipo && item.date === monthSelected
    );
    const invalidItems = filteredItems.filter(
      (item) =>
        !categoriasDelMes.some((categoria) => categoria.name === item.category)
    );

    invalidItems.forEach((item) => handleDelete(item.id));

    return filteredItems.filter((item) =>
      categoriasDelMes.some((categoria) => categoria.name === item.category)
    );
  };

  // Obtiene la data con los presupuestos correspondientes al tipo de transaccion seleccionado (ingreso-egreso).
  const dataTable = obtenerBudgetTable(typeFilter);

  //Busca el presupuesto que coincida con la categoría actual. Retorna el presupuesto si lo encuentra
  //Y si no encuentra presupuesto para esa categoria, retorna undefined.
  const budgetCategory = dataTable.find(
    (item) => item.category === categoryFilter
  );

  //Metodo para obtener la suma de los presupuestos seleccionados
  const totalBudgetAmount = dataTable.reduce((acc, item) => {
    acc += item.budget;
    return acc;
  }, 0);

  return (
    <div className="balance">
      <BudgetButton
        handleDelete={handleDelete}
        dataTable={dataTable}
        typeFilter={typeFilter}
      />

      <BalanceTotal
        selectedTable={selectedTable}
        budgetCategory={budgetCategory}
        totalBudgetAmount={totalBudgetAmount}
      />
    </div>
  );
};

export default ManageResults;
