import {
  ChangeEvent,
  Dispatch,
  SetStateAction,
  useEffect,
  useState,
} from "react";
import "./styles.css";
import TableControlsLayout from "./TableControlsLayout";
import { useMonthContext } from "../../context/MonthContext";
import { Transaction, TransactionType } from "../../types";
import { useCategoryStore } from "../../store/category";
import { useFilterContext } from "../../context/FilterContext";

interface Props {
  setSelectedTable: Dispatch<SetStateAction<Transaction[]>>;
  
}

function TableControls({
  setSelectedTable,
 
}: Props) {
  //Se importan las transacciones del mes correspondiente
  const { transaccionesDelMes } = useMonthContext();
  const categories = useCategoryStore((state) => state.categories);
  const {categoryFilter, setCategoryFilter, typeFilter, setTypeFilter} = useFilterContext()
  //Estado para el filtro de ordenamiento
  const [tableSort, setTableSort] = useState("reciente");

  //Metodo para aplicar categoria y ordenamiento al mes seleccionado
  //Se hace una copia para no alterar el array original
  const applyFilterAndSort = () => {
    let filteredTransactions = [...transaccionesDelMes];

    const categorySelected = categories.find(
      (cat) => cat.name === categoryFilter
    );

    if (categorySelected?.type !== typeFilter) {
      setCategoryFilter("");
    }

    if (typeFilter !== "" || categoryFilter !== "") {
      filteredTransactions = filteredTransactions.filter((item) => {
        const matchesType = typeFilter === "" || item.type === typeFilter;
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
    setTypeFilter(e.target.value as TransactionType);
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

export default TableControls;
