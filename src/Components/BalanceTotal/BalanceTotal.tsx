import { Transaction } from "../../context/reducer";

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
    <div>
      <h4>Total de ingresos: S/ {ingresoTotal}</h4>
      <h4>Total de egresos: S/ {egresoTotal}</h4>
      <h4>Diferencia: S/{ingresoTotal - egresoTotal}</h4>
    </div>
  );
}

export default BalanceTotal;
