import DisplayTransactions from "../DisplayTransactions/DisplayTransactions";
import FormAddTransaction from "../FormAddTransaction/FormAddTransaction";
import { useTransactions } from "./useTransactions";

function MainControl() {
  const {
    handleChange,
    handleClear,
    handlerAddTransaction,
    handleDeleteTransaction,
    handleUpdateTransaction,
    handleChangeFilter,
    categoryFilter,
    filterTable,
    editId,
    values,
  } = useTransactions();

  return (
    <>
      <FormAddTransaction
        handleAdd={handlerAddTransaction}
        handleClear={handleClear}
        handleChange={handleChange}
        editId={editId}
        values={values}
      />
      <DisplayTransactions
        filterTable={filterTable}
        handleDelete={handleDeleteTransaction}
        handleUpdate={handleUpdateTransaction}
        handleChangeFilter={handleChangeFilter}
        categoryFilter={categoryFilter}
      />
    </>
  );
}

export default MainControl;
