import BalanceTotal from "../BalanceTotal/BalanceTotal";
import DisplayTransactions from "../DisplayTransactions/DisplayTransactions";
import FormAddTransaction from "../FormAddTransaction/FormAddTransaction";
import { useTransactions } from "../hooks/useTransactions";
import TableControls from "../TableControls/TableControls";

function MainControl() {
  const {
 
    handlerAddTransaction,
    handleDeleteTransaction,
    handleUpdateTransaction,
    handleChangeFilter,
    handleSortByDate,
    tableSort,
    expenseCategories,
    incomeCategories,
    selectedTable,
    categoryFilter,
    editTransaction,
    
  } = useTransactions();

  return (
    <>
      <FormAddTransaction
        handleAdd={handlerAddTransaction}
  
        expenseCategories={expenseCategories}
        incomeCategories={incomeCategories}
        editTransaction={editTransaction}
     
      />
      <BalanceTotal selectedTable={selectedTable} />
      <TableControls
        handleChangeFilter={handleChangeFilter}
        categoryFilter={categoryFilter}
        handleSortByDate={handleSortByDate}
        tableSort={tableSort}
      />
      <DisplayTransactions
        selectedTable={selectedTable}
        handleDelete={handleDeleteTransaction}
        handleUpdate={handleUpdateTransaction}
        handleChangeFilter={handleChangeFilter}
        categoryFilter={categoryFilter}
        handleSortByDate={handleSortByDate}
        tableSort={tableSort}
      />
    </>
  );
}

export default MainControl;
