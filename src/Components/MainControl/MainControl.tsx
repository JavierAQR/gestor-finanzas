import BalanceTotal from "../BalanceTotal/BalanceTotal";
import DisplayTransactions from "../DisplayTransactions/DisplayTransactions";
import FormAddTransaction from "../FormAddTransaction/FormAddTransaction";
import { useTransactions } from "../hooks/useTransactions";

function MainControl() {
  const {
    handleChange,
    handlerAddTransaction,
    handleDeleteTransaction,
    handleUpdateTransaction,
    handleChangeFilter,
    expenseCategories,
    incomeCategories,
    tablaSeleccionada,
    categoryFilter,
    editId,
    values,
  } = useTransactions();

  return (
    <>
      <FormAddTransaction
        handleAdd={handlerAddTransaction}
        handleChange={handleChange}
        expenseCategories = {expenseCategories}
        incomeCategories = {incomeCategories}
        editId={editId}
        values={values}
      />
      <DisplayTransactions
        tablaSeleccionada={tablaSeleccionada}
        handleDelete={handleDeleteTransaction}
        handleUpdate={handleUpdateTransaction}
        handleChangeFilter={handleChangeFilter}
        categoryFilter={categoryFilter}
      />
      <BalanceTotal tablaSeleccionada={tablaSeleccionada} />
    </>
  );
}

export default MainControl;
