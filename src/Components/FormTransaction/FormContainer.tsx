import { Dispatch, SetStateAction } from "react";
import FormLayout from "./FormLayout";
import { inputs, Transaction } from "../../types";
import { useCategoryStore } from "../../store/category";
import { initialState, useTransactionStore } from "../../store/transaction";

type Props = {
  editTransaction: Transaction;
  setEditTransaction: Dispatch<SetStateAction<Transaction>>;
};

function FormContainer({ editTransaction, setEditTransaction }: Props) {
  
  const addNewTransaction = useTransactionStore(
    (state) => state.addNewTransaction
  );
  const updateTransaction = useTransactionStore(
    (state) => state.updateTransaction
  );
  const categories = useCategoryStore((state) => state.categories);

  const handleAddTransaction = (data: inputs) => {
    if (editTransaction === initialState) {
      addNewTransaction(data);
    } else {
      setEditTransaction(initialState);
      updateTransaction(editTransaction.id, data);
    }
  };

  const expenseCategories = categories.filter((item) => {
    if (item.type === "egreso") {
      return item.name;
    }
  });

  const incomeCategories = categories.filter((item) => {
    if (item.type === "ingreso") {
      return item.name;
    }
  });

  return (
    <FormLayout
      handleAddTransaction={handleAddTransaction}
      incomeCategories={incomeCategories}
      expenseCategories={expenseCategories}
      editTransaction={editTransaction}
    />
  );
}

export default FormContainer;
