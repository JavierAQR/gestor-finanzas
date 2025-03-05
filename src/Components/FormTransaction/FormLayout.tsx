import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { initialState, inputs, Transaction } from "../../context/reducer";

import "./FormStyles.css";
import { Category } from "../../context/reducerCategories";

type Props = {
  handlerAddTransaction: (data: inputs) => void;
  expenseCategories: Category[];
  incomeCategories: Category[];
  editTransaction: Transaction;
};

const FormLayout = ({
  handlerAddTransaction,
  expenseCategories,
  incomeCategories,
  editTransaction,
}: Props) => {
  const date = new Date();
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0"); // Meses van de 0 a 11
  const day = String(date.getDate()).padStart(2, "0");
  const formattedDate = `${year}-${month}-${day}`;

  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm<inputs>({
    defaultValues: {
      description: "",
      category: "",
      date: formattedDate,
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
        date: formattedDate,
        amount: NaN,
        type: "",
      });
    }
  }, [editTransaction, reset]);

  const onSubmit = handleSubmit((data) => {
    handlerAddTransaction(data);
    reset();
  });

  const typeSelected =
    watch("type") === "ingreso" ? incomeCategories : expenseCategories;

  return (
    <div className="formulario-transaccion">
      <form onSubmit={onSubmit}>
        <div className={`input-field ${watch("type") ? "filled" : ""}`}>
          <select
            {...register("type", {
              required: {
                value: true,
                message: "El tipo es requerido",
              },
            })}
          >
            <option value="egreso">Egreso</option>
            <option value="ingreso">Ingreso</option>
          </select>
          <label>Tipo</label>
          {errors.type && (
            <span className="error-message">{errors.type.message}</span>
          )}
        </div>
        <div className={`input-field ${watch("description") ? "filled" : ""}`}>
          <input
            type="text"
            {...register("description", {
              required: {
                value: true,
                message: "La descripción es requerida",
              },
            })}
          />
          <label>Descripción</label>
          {errors.description && (
            <span className="error-message">{errors.description.message}</span>
          )}
        </div>
        <div className={`input-field ${watch("amount") ? "filled" : ""}`}>
          <input
            type="number"
            step="any"
            {...register("amount", {
              required: {
                value: true,
                message: "El monto es requerido",
              },
              min: {
                value: 1,
                message: "El monto mínimo es 1",
              },
            })}
          />
          <label>Monto (Soles)</label>
          {errors.amount && (
            <span className="error-message">{errors.amount.message}</span>
          )}
        </div>
        <div className={`input-field ${watch("category") ? "filled" : ""}`}>
          <select
            {...register("category", {
              required: {
                value: true,
                message: "La categoría es requerida",
              },
            })}
          >
            <option disabled></option>
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
          {errors.category && (
            <span className="error-message">{errors.category.message}</span>
          )}
        </div>
        <div className={`input-field ${watch("date") ? "filled" : ""}`}>
          <input
            type="date"
            {...register("date", {
              required: {
                value: true,
                message: "La fecha es requerida",
              },
            })}
          />
          {errors.date && (
            <span className="error-message">{errors.date.message}</span>
          )}
        </div>
        <button type="submit" className="boton-formulario">
          {editTransaction.id === "" ? "AGREGAR" : "ACTUALIZAR"}
        </button>
      </form>
    </div>
  );
};

export default FormLayout;
