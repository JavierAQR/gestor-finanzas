import ReusableBalance from "../TransactionBalance/ReusableBalance";
interface Props {
  typeFilter: string;
  categoryFilter: string;
  balance: number;
  budgetAmount: number;
}

const BudgetContainer = ({
  typeFilter,
  categoryFilter,
  balance,
  budgetAmount,
}: Props) => {
  //Si no hay una categoría, en el título solo se muestra ingresos o egresos, si hay una categoría, se muestra el nombre de la categoría
  const tituloPresupuesto =
    categoryFilter === "" ? typeFilter + "s" : categoryFilter;

  //Titulo del balance del resultado dependiendo del tipo de transaccion y el signo del monto restante
  const tituloResultado =
    typeFilter === "ingreso"
      ? balance < 0
        ? "Faltante"
        : "Excedente"
      : balance < 0
      ? "Sobrepaso"
      : "Ahorro";

  return (
    <>
      {/* Balance que muestra el presupuesto correspondiente a la categoría */}
      <ReusableBalance
        titulo={`Presupuesto ${tituloPresupuesto}`}
        monto={budgetAmount}
      />

      {/* Mostrar la diferencia del presupuesto con el monto total (Mostrar exceso o ahorro)*/}
      {budgetAmount !== 0 && (
        <ReusableBalance
          className={balance < 0 ? "negativo" : "positivo"}
          titulo={tituloResultado}
          monto={Math.abs(balance)}
        />
      )}
    </>
  );
};

export default BudgetContainer;
