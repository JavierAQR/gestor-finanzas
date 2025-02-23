import { Transaction } from "../../context/reducer";
import "./styles.css";

type Props = {
  selectedTable: Transaction[];
};

function BalanceTotal({ selectedTable }: Props) {
  const ingresoTotal = selectedTable
    .filter((item) => item.type === "income")
    .reduce((acc, total) => acc + Number(total.amount), 0);

  const egresoTotal = selectedTable
    .filter((item) => item.type === "expense")
    .reduce((acc, total) => acc + Number(total.amount), 0);

  return (
    <div className="balance-total">
      <div className="total">
        <h4>Total de ingresos</h4>
        <span>S/ {ingresoTotal}</span>
      </div>
      <div className="total">
        <h4>Total de egresos</h4>
        <span> S/ {egresoTotal}</span>
      </div>
      <div className="total">
        <h4>Diferencia</h4>
        <span>S/ {ingresoTotal - egresoTotal}</span>
      </div>
    </div>
  );
}

export default BalanceTotal;
