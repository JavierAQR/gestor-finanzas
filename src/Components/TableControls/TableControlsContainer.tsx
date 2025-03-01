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

interface Props {
  setSelectedTable: Dispatch<SetStateAction<Transaction[]>>;
  monthSelected: string;
  setMonthSelected: Dispatch<SetStateAction<string>>;
}

function TableControlsContainer({
  setSelectedTable,
  monthSelected,
  setMonthSelected,
}: Props) {
  const { state } = useDataContext();

  const [tableSort, setTableSort] = useState("reciente");
  const [categoryFilter, setCategoryFilter] = useState("");
  

  const historyTransactions = state.reduce<{
    [key: string]: Transaction[];
  }>((obj, item) => {
    const monthKey = item.date.slice(0, 7);
    if (!obj[monthKey]) {
      obj[monthKey] = [];
    }
    obj[monthKey].push(item);
    return obj;
  }, {});

  //Array con las todas las claves del objeto historyTransactions (los meses)
  const keysHistoryTransactions = Object.keys(historyTransactions).sort(
    (a, b) => b.localeCompare(a)
  );

  //Metodo para aplicar filtro categoria y ordenamiento
  //Primero define filteredTransactions con el valor del array de transacciones del mes seleccionado.
  //Luego, si el estado categoryFilter posee un valor que no sea vacío (""), se filtra el array para mostrar solo las transacciones en las que la propiedad category coincida con el valor almacenado en categoryFilter
  //Una vez ya filtrada la tabla (por categoría), se lleva a cabo el segundo metodo, el de ordenamiento.
  //Este metodo toma una copia de la tabla filtrada, y la ordena segun sea el valor del estado tableSort ("antiguo o reciente"), para almacenar el resultado en otro array llamado sortedTransactions.
  //Luego el estado selectedTable toma el valor de sortedTransactions.

  const applyFilterAndSort = () => {
    let filteredTransactions =
      historyTransactions[monthSelected] ||
      historyTransactions[keysHistoryTransactions[0]];

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

  useEffect(() => {
    applyFilterAndSort();
  }, [categoryFilter, tableSort, state, monthSelected]);

  //Metodo para cambiar el ordenamiento
  const handleSortByDate = (e: ChangeEvent<HTMLSelectElement>) => {
    setTableSort(e.target.value);
  };

  const handleMonth = (e: ChangeEvent<HTMLSelectElement>) => {
    setMonthSelected(e.target.value);
  };

  return (
    <TableControlsLayout
      setCategoryFilter={setCategoryFilter}
      tableSort={tableSort}
      handleSortByDate={handleSortByDate}
      categoryFilter={categoryFilter}
      monthSelected={monthSelected}
      handleMonth={handleMonth}
      keysHistoryTransactions={keysHistoryTransactions}
    />
  );
}

export default TableControlsContainer;
