import DisplayTransactions from "../DisplayTransactions/DisplayTransactions";
import FormAddTransaction from "../FormAddTransaction/FormAddTransaction";
import { useTransactions } from "./useTransactions";

function MainControl() {
  const { handleChange, handleClear, handlerAddTransaction, handleDeleteTransaction,
    handleUpdateTransaction, values } =
    useTransactions();

  return (
    <>
      <FormAddTransaction
        handleAdd={handlerAddTransaction}
        handleClear={handleClear}
        handleChange={handleChange}
        values={values}
      />
      <DisplayTransactions handleDelete = {handleDeleteTransaction} handleUpdate = {handleUpdateTransaction}/>
    </>
  );
}

export default MainControl;
