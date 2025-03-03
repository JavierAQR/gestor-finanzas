import {
  ChangeEvent,
  Dispatch,
  SetStateAction,
  useEffect,
  useState,
} from "react";
import "./styles.css";
import TableControlsLayout from "./TableControlsLayout";
import { Transaction } from "../../context/reducer";
import { useMonthContext } from "../../context/MonthContext";

interface Props {
  setSelectedTable: Dispatch<SetStateAction<Transaction[]>>;
}

function TableControlsContainer({ setSelectedTable }: Props) {
  //Se importan las transacciones del mes correspondiente
  const { transaccionesDelMes } = useMonthContext();

  //Estado para el filtro de ordenamiento
  const [tableSort, setTableSort] = useState("reciente");

  //Estado para el filtro por categoría
  const [categoryFilter, setCategoryFilter] = useState("");

  //Estado para el filtro por tipo
  const [typeFilter, setTypeFilter] = useState("");

  //Metodo para aplicar categoria y ordenamiento al mes seleccionado
  //Se hace una copia para no alterar el array original
  const applyFilterAndSort = () => {
    let filteredTransactions = [...transaccionesDelMes];

    if (typeFilter !== "" || categoryFilter !== "") {
      filteredTransactions = filteredTransactions.filter((item) => {
        const matchesType = typeFilter === "" || item.type  === typeFilter;
        const matchesCategory =
          categoryFilter === "" || item.category === categoryFilter;
        return matchesType && matchesCategory;
      });
    }

    //Si el filtro de tipo es Todos, la categoría también será Todos
    if (typeFilter === "") {
      setCategoryFilter("");
    }

    //Una vez filtrado por tipo y categoría, se ordena segun el estado
    const sortedTransactions = [...filteredTransactions].sort((a, b) => {
      const A = new Date(a.date);
      const B = new Date(b.date);
      if (tableSort === "antiguo") return A.getTime() - B.getTime();
      return B.getTime() - A.getTime();
    });

    //Finalmente este resultado se establece en la tabla a pintar
    setSelectedTable(sortedTransactions);
  };

  //Se vuelve a ejecutar el metodo si cambian los filtros(tipo, categoria y ordenamiento) o las transacciones del mes
  useEffect(() => {
    applyFilterAndSort();
  }, [categoryFilter, tableSort, transaccionesDelMes, typeFilter]);

  //Metodo para cambiar el ordenamiento
  const handleSortByDate = (e: ChangeEvent<HTMLSelectElement>) => {
    setTableSort(e.target.value);
  };

  //Metodo para cambiar el filtro de tipo
  const handleType = (e: ChangeEvent<HTMLSelectElement>) => {
    setTypeFilter(e.target.value);
  };

  //Metodo para cambiar el filtro de categoria
  const handleCategory = (e: ChangeEvent<HTMLSelectElement>) => {
    setCategoryFilter(e.target.value);
  };

  return (
    <TableControlsLayout
      tableSort={tableSort}
      handleSortByDate={handleSortByDate}
      categoryFilter={categoryFilter}
      typeFilter={typeFilter}
      handleCategory={handleCategory}
      handleType={handleType}
    />
  );
}

export default TableControlsContainer;
