import { Dispatch, SetStateAction } from "react";
import FormLayout from "./FormLayout";
import { useDataContext } from "../../context/TransactionContext";
import { initialState, inputs, Transaction } from "../../context/reducer";

type Props = {
  editTransaction: Transaction;
  setEditTransaction: Dispatch<SetStateAction<Transaction>>;
};

function FormContainer({ editTransaction, setEditTransaction }: Props) {
  const contextData = useDataContext();

  const handlerAddTransaction = (data: inputs) => {
    if (editTransaction === initialState) {
      contextData.dispatch({
        type: "ADD",
        payload: {
          description: data.description,
          amount: data.amount,
          category: data.category,
          date: data.date,
          type: data.type,
        },
      });
    } else {
      setEditTransaction(initialState);
      contextData.dispatch({
        type: "UPDATE",
        payload: {
          id: editTransaction.id,
          datosAct: data,
        },
      });
    }
  };

  const expenseCategories = contextData.categoryArray.filter((item) => {
    if (item.type === "egreso") {
      return item.name;
    }
  });

  const incomeCategories = contextData.categoryArray.filter((item) => {
    if (item.type === "ingreso") {
      return item.name;
    }
  });

  return (
    <FormLayout
      handlerAddTransaction={handlerAddTransaction}
      incomeCategories={incomeCategories}
      expenseCategories={expenseCategories}
      editTransaction={editTransaction}
    />
  );
}

export default FormContainer;
