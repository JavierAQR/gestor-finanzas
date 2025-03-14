import { Dispatch, SetStateAction } from "react";
import FormLayout from "./TransactionFormLayout";
import { inputs, Transaction } from "../../types";
import { useCategoryStore } from "../../store/category";
import { useTransactionStore } from "../../store/transaction";

type Props = {
  editTransaction: Transaction | null;
  setEditTransaction: Dispatch<SetStateAction<Transaction | null>>;
};

function TransactionForm({ editTransaction, setEditTransaction }: Props) {
  const addNewTransaction = useTransactionStore(
    (state) => state.addNewTransaction
  );
  const updateTransaction = useTransactionStore(
    (state) => state.updateTransaction
  );
  const categories = useCategoryStore((state) => state.categories);

  const handleAddTransaction = (data: inputs) => {
    if (!editTransaction) {
      addNewTransaction(data);
    } else {
      setEditTransaction(null);
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

export default TransactionForm;
