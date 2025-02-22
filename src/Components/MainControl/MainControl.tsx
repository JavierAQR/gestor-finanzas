import BalanceTotal from "../BalanceTotal/BalanceTotal";
import DisplayTransactions from "../DisplayTransactions/DisplayTransactions";
import FormAddTransaction from "../FormAddTransaction/FormAddTransaction";
import { useTransactions } from "../hooks/useTransactions";
import TableControls from "../TableControls/TableControls";

function MainControl() {
  const {
    handleChange,
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
    editId,
    values,
  } = useTransactions();

  return (
    <>
      <FormAddTransaction
        handleAdd={handlerAddTransaction}
        handleChange={handleChange}
        expenseCategories={expenseCategories}
        incomeCategories={incomeCategories}
        editId={editId}
        values={values}
      />
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
      <BalanceTotal selectedTable={selectedTable} />
    </>
  );
}

export default MainControl;
