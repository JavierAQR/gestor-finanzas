import { Transaction } from "../../context/reducer";
import BudgetContainer from "../ManageBudget/BudgetContainer";
import ReusableBalance from "./ReusableBalance";
import "./styles.css";

type Props = {
  selectedTable: Transaction[];
  typeFilter: string;
  categoryFilter: string;
};

function BalanceTotal({ selectedTable, typeFilter, categoryFilter }: Props) {
  const { ingresoTotal, egresoTotal } = selectedTable.reduce(
    (acc, item) => {
      if (item.type === "ingreso") acc.ingresoTotal += Number(item.amount);
      if (item.type === "egreso") acc.egresoTotal += Number(item.amount);
      return acc;
    },
    { ingresoTotal: 0, egresoTotal: 0 }
  );

  //Diferencia general entre ingresos totales y egresos totales
  const diferenciaTotal = ingresoTotal - egresoTotal;

  //Muestra solo el ingreso total o el egreso total, dependiendo del tipo de transaccion elegido en el filtro de la tabla
  const gastoTotalPorTipo =
    typeFilter === "ingreso" ? ingresoTotal : egresoTotal;

  return (
    <div className="balance-total">
      {typeFilter === "" && (
        <>
          <ReusableBalance titulo="Total de ingresos" monto={ingresoTotal} />
          <ReusableBalance titulo="Total de egresos" monto={egresoTotal} />
          <ReusableBalance titulo="Restante" monto={diferenciaTotal} />
        </>
      )}
      {typeFilter !== "" && (
        <>
          <ReusableBalance
            titulo={`Total de ${
              categoryFilter !== "" ? categoryFilter : typeFilter + "s"
            } `}
            monto={gastoTotalPorTipo}
          />
          <BudgetContainer
            typeSelected={typeFilter}
            categoryFilter={categoryFilter}
            montoTotal={gastoTotalPorTipo}
          />
        </>
      )}
    </div>
  );
}

export default BalanceTotal;
