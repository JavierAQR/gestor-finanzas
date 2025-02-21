import { ChangeEvent, FormEvent, useState } from "react";
import { useDataContext } from "../../context/TransactionContext";
import { inputs } from "../../context/reducer";

export function useTransactions() {
  const [editId, setEditId] = useState("");
  const contextData = useDataContext();

  const [values, setValues] = useState<inputs>({
    description: "",
    amount: 0,
    category: "",
    date: new Date().toISOString().split("T")[0],
    type: "expense",
  });

  const handlerAddTransaction = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (editId === "") {
      contextData.dispatch({
        type: "ADD",
        payload: {
          description: values.description,
          amount: values.amount,
          category: values.category,
          date: values.date,
          type: values.type,
        },
      });
    } else {
      setEditId("");
      contextData.dispatch({
        type: "UPDATE",
        payload: {
          id: editId,
          datosAct: values,
        },
      });
    }
    setValues({
      description: "",
      category: "",
      date: new Date().toISOString().split("T")[0],
      amount: 0,
      type: "expense",
    });
  };

  const handleDeleteTransaction = (id: string) => {
    contextData.dispatch({
      type: "DELETE",
      payload: id,
    });
  };

  const handleUpdateTransaction = (datos: inputs, id: string) => {
    setEditId(id);
    setValues({
      amount: datos.amount,
      category: datos.category,
      date: datos.date,
      description: datos.description,
      type: datos.type,
    });
  };

  const handleClear = () => {
    contextData.dispatch({
      type: "CLEAR",
    });
  };

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setValues({
      ...values,
      [e.target.name]: e.target.value,
    });
  };

  return {
    handleChange,
    handleClear,
    handleDeleteTransaction,
    handleUpdateTransaction,
    handlerAddTransaction,
    values,
  };
}
