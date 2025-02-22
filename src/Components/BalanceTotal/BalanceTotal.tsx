import { Transaction } from "../../context/reducer";

type Props = {
  tablaSeleccionada: Transaction[];
};

function BalanceTotal({ tablaSeleccionada }: Props) {
  const ingresoTotal = tablaSeleccionada
    .filter((item) => item.type === "income")
    .reduce((acc, total) => acc + Number(total.amount), 0);

  const egresoTotal = tablaSeleccionada
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
