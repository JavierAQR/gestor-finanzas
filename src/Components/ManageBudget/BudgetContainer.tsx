import { useState } from "react";
import ModalContainer from "../ReusableModal/ModalContainer";
import BudgetLayout from "./BudgetLayout";
import { budgetForm } from "../../context/reducerBudget";
import { useBudgetContext } from "../../context/BudgetContext";
import { useMonthContext } from "../../context/MonthContext";
import { useDataContext } from "../../context/TransactionContext";
import ReusableBalance from "../BalanceTotal/ReusableBalance";

interface Props {
  typeSelected: string;
  categoryFilter: string;
  montoTotal: number;
}

const BudgetContainer = ({
  typeSelected,
  categoryFilter,
  montoTotal,
}: Props) => {
  const [budgetIsOpen, setBudgetIsOpen] = useState(false);
  const { monthSelected } = useMonthContext();
  const { budget, setBudget } = useBudgetContext();
  const { categoryArray } = useDataContext();

  //Metodo para buscar el tipo correspondiente a la categoría pasada por parámetro
  const buscarTipo = (category: string) => {
    const categoria = categoryArray.find((item) => item.name === category);
    if (categoria) {
      return categoria.type;
    } else {
      return "";
    }
  };

  //Metodo para agregar un nuevo presupuesto. Obtiene como type el que corresponde a su category, y como date la fecha seleccionada en el contexto.
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

  //Metodo para obtener la data de presupuestos que se pasará a la tabla. Se filtra de acuerdo al filtro de tipo seleccionado (ingreso-egreso);
  const obtenerBudgetTable = (tipo: string) =>
    budget.filter((item) => item.type === tipo && item.date === monthSelected);

  // Obtiene la data con los presupuestos correspondientes al tipo de transaccion seleccionado (ingreso-egreso)
  const dataTable = obtenerBudgetTable(typeSelected);

  //Si no hay una categoría, en el título solo se muestra ingresos o egresos, si hay una categoría, se muestra el nombre de la categoría
  const tituloPresupuesto =
    categoryFilter === "" ? typeSelected + "s" : categoryFilter;

  //Busca el presupuesto que coincida con la categoría actual. Retorna el presupuesto si lo encuentra
  //Y si no encuentra presupuesto para esa categoria, retorna undefined.
  const presupuestoCategoriaActual = dataTable.find(
    (item) => item.category === categoryFilter
  );

  //Metodo para obtener la suma de los presupuestos seleccionados
  const sumaPresupuestos = dataTable.reduce((acc, item) => {
    acc += item.budget;
    return acc;
  }, 0);

  // Si la categoría actual tiene presupuesto, se retorna el monto del presupuesto
  // Si el filtro por categoria actual es ""(todas las categorias) entonces se retorna la suma de todos los presupuestos registados.
  // Si en caso la categoría no tiene presupuesto, se retorna 0.
  const mostrarPresupuesto =
    presupuestoCategoriaActual !== undefined
      ? presupuestoCategoriaActual.budget
      : categoryFilter === ""
      ? sumaPresupuestos
      : 0;

  return (
    <>
      <div className="presupuesto">
        {/* Balance que muestra el presupuesto correspondiente a la categoría */}
        <ReusableBalance
          titulo={`Presupuesto ${tituloPresupuesto}`}
          monto={mostrarPresupuesto}
        />
        {/* Botón que abre el modal */}
        <button
          className="btn-gestion-budget"
          onClick={() => setBudgetIsOpen(true)}
        >
          Gestionar Presupuesto
        </button>
        {/* Componente con el modal para gestionar los presupuestos */}
        <ModalContainer isOpen={budgetIsOpen} setIsOpen={setBudgetIsOpen}>
          <BudgetLayout
            typeSelected={typeSelected}
            handleAddBudget={handleAddBudget}
            dataTable={dataTable}
          />
        </ModalContainer>
      </div>
      {/* Mostrar la diferencia del presupuesto con el monto total (Mostrar exceso o ahorro)*/}
      {mostrarPresupuesto !== 0 && (
        <div className={`total`}>
          <h4>{typeSelected === "ingreso" ? "Faltante" : "Ahorro"}</h4>
          <span>S/ {mostrarPresupuesto - montoTotal}</span>
        </div>
      )}
    </>
  );
};

export default BudgetContainer;
