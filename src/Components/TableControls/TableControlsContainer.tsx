import { ChangeEvent, Dispatch, SetStateAction, useEffect, useState } from "react";
import { useDataContext } from "../../context/TransactionContext";
import "./styles.css";
import TableLayout from "./TableControlsLayout";
import { Transaction } from "../../context/reducer";

interface Props{
  setSelectedTable: Dispatch<SetStateAction<Transaction[]>>
}

function TableControls({setSelectedTable}: Props) {
  const contextData = useDataContext();
  const [tableSort, setTableSort] = useState("reciente");
  const [categoryFilter, setCategoryFilter] = useState("");
  

  const handleChangeFilter = (e: ChangeEvent<HTMLSelectElement>) => {
    setCategoryFilter(e.target.value);
  };

  const applyFilterAndSort = () => {
    let filteredTransactions = contextData.state;
    if (categoryFilter !== "") {
      filteredTransactions = contextData.state.filter(
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

  const handleSortByDate = (e: ChangeEvent<HTMLSelectElement>) => {
    setTableSort(e.target.value);
  };

  useEffect(() => {
    applyFilterAndSort();
  }, [categoryFilter, tableSort, contextData.state]);

  return (
    <TableLayout
      handleChangeFilter={handleChangeFilter}
      tableSort={tableSort}
      handleSortByDate={handleSortByDate}
      categoryFilter={categoryFilter}
    />
  );
}

export default TableControls;
