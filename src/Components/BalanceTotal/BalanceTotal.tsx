import { Transaction } from "../../context/reducer";
import "./styles.css";

type Props = {
  selectedTable: Transaction[];
};

function BalanceTotal({ selectedTable }: Props) {
  console.log(selectedTable);

  const { ingresoTotal, egresoTotal } = selectedTable.reduce(
    (acc, item) => {
      if (item.type === "income") acc.ingresoTotal += Number(item.amount);
      if (item.type === "expense") acc.egresoTotal += Number(item.amount);
      return acc;
    },
    { ingresoTotal: 0, egresoTotal: 0 }
  );

  const getClass = (value: number) => (value === 0 ? "vacío" : "total");
  const diferencia = ingresoTotal - egresoTotal;

  return (
    <div className="balance-total">
      <div className={getClass(ingresoTotal)}>
        <h4>Total de ingresos</h4>
        <span>S/ {ingresoTotal}</span>
      </div>
      <div className={getClass(egresoTotal)}>
        <h4>Total de egresos</h4>
        <span> S/ {egresoTotal}</span>
      </div>
      {
        <div className={`total`}>
          <h4>{diferencia >= 0 ? "Restante" : "Perdida"}</h4>
          <span>S/ {diferencia}</span>
        </div>
      }
    </div>
  );
}

export default BalanceTotal;
