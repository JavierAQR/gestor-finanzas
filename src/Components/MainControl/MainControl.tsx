import DisplayTransactions from "../DisplayTransactions/DisplayTransactions";
import FormAddTransaction from "../FormAddTransaction/FormAddTransaction";
import { useTransactions } from "./useTransactions";

function MainControl() {
  const { handleChange, handleClear, handlerAddTransaction, handleDeleteTransaction,
    handleUpdateTransaction, editId, values } =
    useTransactions();

  return (
    <>
      <FormAddTransaction
        handleAdd={handlerAddTransaction}
        handleClear={handleClear}
        handleChange={handleChange}
        editId={editId}
        values={values}
      />
      <DisplayTransactions handleDelete = {handleDeleteTransaction} handleUpdate = {handleUpdateTransaction}/>
    </>
  );
}

export default MainControl;
