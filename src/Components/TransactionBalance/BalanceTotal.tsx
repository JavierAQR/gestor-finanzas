import { useFilterContext } from "../../context/FilterContext";
import { Budget, Transaction } from "../../types";
import BudgetContainer from "../ManageResults/BudgetContainer";
import ReusableBalance from "./ReusableBalance";
import "./styles.css";

type Props = {
  selectedTable: Transaction[];

  budgetCategory: Budget | undefined;
  totalBudgetAmount: number;
};

function BalanceTotal({
  selectedTable,

  budgetCategory,
  totalBudgetAmount,
}: Props) {
  const { typeFilter, categoryFilter } = useFilterContext();

  const getTotalAmountByType = (typeFilter: string) => {
    return selectedTable
      .filter((item) => item.type === typeFilter)
      .reduce((acc, item) => (acc += Number(item.amount)), 0);
  };

  //Diferencia general entre ingresos totales y egresos totales
  const remaining =
    getTotalAmountByType("ingreso") - getTotalAmountByType("egreso");

  //Muestra solo el ingreso total o el egreso total, dependiendo del tipo de transaccion elegido en el filtro de la tabla
  const totalAmountByType = getTotalAmountByType(typeFilter);

  // Si la categoría actual tiene presupuesto, se retorna el monto del presupuesto
  // Si en caso la categoría no tiene presupuesto, se retorna 0.
  // Si el filtro por categoria actual es ""(todas las categorias) entonces se retorna la suma de todos los presupuestos registados.
  const budgetAmount = budgetCategory
    ? budgetCategory.budget
    : categoryFilter === ""
    ? totalBudgetAmount
    : 0;

  //Monto restante comparando el montoTotal de la categoría y el monto del presupuesto correspondiente
  const balance =
    typeFilter === "ingreso"
      ? totalAmountByType - budgetAmount
      : budgetAmount - totalAmountByType;

  return (
    <div className="balance-total">
      {typeFilter === "" && (
        <>
          <ReusableBalance
            titulo="Total de ingresos"
            monto={getTotalAmountByType("ingreso")}
          />
          <ReusableBalance
            titulo="Total de egresos"
            monto={getTotalAmountByType("egreso")}
          />
          <ReusableBalance titulo="Restante" monto={remaining} />
        </>
      )}
      {typeFilter !== "" && (
        <>
          <ReusableBalance
            titulo={`Total de ${
              categoryFilter !== "" ? categoryFilter : typeFilter + "s"
            } `}
            monto={totalAmountByType}
          />
          <BudgetContainer
            typeFilter={typeFilter}
            categoryFilter={categoryFilter}
            balance={balance}
            budgetAmount={budgetAmount}
          />
        </>
      )}
    </div>
  );
}

export default BalanceTotal;
