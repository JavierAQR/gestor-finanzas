import {
  ChangeEvent,
  Dispatch,
  SetStateAction,
  useEffect,
  useState,
} from "react";
import { useDataContext } from "../../context/TransactionContext";
import "./styles.css";
import TableControlsLayout from "./TableControlsLayout";
import { Transaction } from "../../context/reducer";
import { useMonthContext } from "../../context/MonthContext";

interface Props {
  setSelectedTable: Dispatch<SetStateAction<Transaction[]>>;
}

function TableControlsContainer({ setSelectedTable }: Props) {
  //Se importan las transacciones
  const { state } = useDataContext();

  //Se importan las transacciones separadas por mes, el mes seleccionado y el array de meses registrados
  const { transaccionesPorMes, monthSelected, keysMonths } = useMonthContext();

  //Estado para el ordenamiento
  const [tableSort, setTableSort] = useState("reciente");

  //Estado para el filtro por categoría
  const [categoryFilter, setCategoryFilter] = useState("");

  //Metodo para aplicar categoria y ordenamiento del mes seleccionado
  const applyFilterAndSort = () => {
    let filteredTransactions =
      transaccionesPorMes[monthSelected] || transaccionesPorMes[keysMonths[0]];

    if (!filteredTransactions) {
      filteredTransactions = [];
    }

    if (categoryFilter !== "") {
      filteredTransactions = state.filter(
        (item) => item.category === categoryFilter
      );
    }

    const sortedTransactions = [...filteredTransactions].sort((a, b) => {
      const A = new Date(a.date);
      const B = new Date(b.date);
      if (tableSort === "antiguo") return A.getTime() - B.getTime();
      return B.getTime() - A.getTime();
    });

    setSelectedTable(sortedTransactions);
  };

  //Se vuelve a ejecutar el metodo si cambia el filtro, ordenamiento, los registros o el mes seleccionado
  useEffect(() => {
    applyFilterAndSort();
  }, [categoryFilter, tableSort, state, monthSelected]);

  //Metodo para cambiar el ordenamiento
  const handleSortByDate = (e: ChangeEvent<HTMLSelectElement>) => {
    setTableSort(e.target.value);
  };

  return (
    <TableControlsLayout
      setCategoryFilter={setCategoryFilter}
      tableSort={tableSort}
      handleSortByDate={handleSortByDate}
      categoryFilter={categoryFilter}
    />
  );
}

export default TableControlsContainer;
