import { useEffect } from "react";
import { initialState, inputs, Transaction } from "../../context/reducer";
import { CategoryArray } from "../../context/TransactionContext";
import "./styles.css";
import { useForm } from "react-hook-form";

type Props = {
  handleAdd: (data: inputs) => void;

  expenseCategories: CategoryArray[];
  incomeCategories: CategoryArray[];
  editTransaction: Transaction;
};

function FormAddTransaction({
  editTransaction,
  expenseCategories,
  incomeCategories,
  handleAdd,
}: Props) {
  const { register, handleSubmit, watch, reset } = useForm<inputs>({
    defaultValues: {
      description: "",
      category: "",
      date: new Date().toISOString().split("T")[0],
      amount: NaN,
      type: "",
    },
  });

  useEffect(() => {
    if (editTransaction !== initialState) {
      reset(editTransaction);
    } else {
      reset({
        description: "",
        category: "",
        date: new Date().toISOString().split("T")[0],
        amount: NaN,
        type: "",
      });
    }
  }, [editTransaction, reset]);

  const onSubmit = handleSubmit((data) => {
    handleAdd(data);
    reset();
  });

  const typeSelected =
    watch("type") === "income" ? incomeCategories : expenseCategories;

  return (
    <div className="formulario-transaccion">
      <h1>Ingresar Transacción</h1>
      <form onSubmit={onSubmit}>
        <div className={`input-field ${watch("type") ? "filled" : ""}`}>
          <select
            {...register("type", {
              required: true,
            })}
          >
            <option value="" disabled></option>
            <option value="expense">Egreso</option>
            <option value="income">Ingreso</option>
          </select>
          <label>Tipo</label>
        </div>
        <div className={`input-field ${watch("description") ? "filled" : ""}`}>
          <input
            type="text"
            {...register("description", {
              required: true,
            })}
          />
          <label>Descripción</label>
        </div>
        <div className={`input-field ${watch("amount") ? "filled" : ""}`}>
          <input
            type="number"
            step="any"
            {...register("amount", {
              required: true,
              minLength: 1,
            })}
          />
          <label>Monto (Soles)</label>
        </div>
        <div className={`input-field ${watch("category") ? "filled" : ""}`}>
          <select
            {...register("category", {
              required: true,
            })}
          >
            <option value="" disabled></option>
            //Si no hay un tipo Seleccionado, no cargan las categorías
            {watch("type") !== ""
              ? typeSelected.map((item, index) => (
                  <option key={index} value={item.name}>
                    {item.name}
                  </option>
                ))
              : null}
          </select>
          <label>Categoría</label>
        </div>
        <div className={`input-field ${watch("date") ? "filled" : ""}`}>
          <input
            type="date"
            {...register("date", {
              required: true,
            })}
          />
        </div>
        <button type="submit" className="boton-formulario">
          {editTransaction.id === "" ? "AGREGAR" : "ACTUALIZAR"}
        </button>
      </form>
    </div>
  );
}

export default FormAddTransaction;
