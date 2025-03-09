import { Transaction } from "../../context/reducer";
import BudgetContainer from "../ManageBudget/BudgetContainer";
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

  const diferencia = ingresoTotal - egresoTotal;

  return (
    <div className="balance-total">
      {typeFilter === "" && (
        <>
          <div className="total">
            <h4>Total de ingresos</h4>
            <span>S/ {ingresoTotal}</span>
          </div>
          <div className="total">
            <h4>Total de egresos</h4>
            <span> S/ {egresoTotal}</span>
          </div>
          <div className={`total`}>
            <h4>{"Restante"}</h4>
            <span>S/ {diferencia}</span>
          </div>
        </>
      )}
      {typeFilter === "ingreso" && (
        <>
          <div className="total">
            <h4>Total de ingresos </h4>{" "}
            {/*Cambiar a Total de (categoria) cuando haya una categoría seleccionada */}
            <span>S/ {ingresoTotal}</span>
          </div>
          <BudgetContainer
            typeSelected={typeFilter}
            categoryFilter={categoryFilter}
            montoTotal={ingresoTotal}
          />
        </>
      )}
      {typeFilter === "egreso" && (
        <>
          <div className="total">
            <h4>Total de egresos</h4>
            <span> S/ {egresoTotal}</span>
          </div>
          <BudgetContainer
            typeSelected={typeFilter}
            categoryFilter={categoryFilter}
            montoTotal={egresoTotal}
          />
        </>
      )}
    </div>
  );
}

export default BalanceTotal;
