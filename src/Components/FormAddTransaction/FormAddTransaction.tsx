import { ChangeEvent, FormEvent } from "react";
import { inputs } from "../../context/reducer";
import { CategoryArray } from "../../context/TransactionContext";
import "./styles.css";

type Props = {
  handleAdd: (e: FormEvent<HTMLFormElement>) => void;
  handleChange: (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
  expenseCategories: CategoryArray[];
  incomeCategories: CategoryArray[];

  editId: string;
  values: inputs;
};

function FormAddTransaction({
  handleAdd,
  handleChange,
  editId,
  values,
  expenseCategories,
  incomeCategories,
}: Props) {
  const typeSelected =
    values.type === "income" ? incomeCategories : expenseCategories;

  return (
    <div className="formulario-transaccion">
      <h1>Ingresar Transacción</h1>
      <form action="" onSubmit={handleAdd}>
        <div className="input-field">
          <select
            name="type"
            value={values.type}
            onChange={handleChange}
            required
          >
            <option value="" disabled selected></option>
            <option value="expense">Egreso</option>
            <option value="income">Ingreso</option>
          </select>
          <label htmlFor="type">Tipo</label>
        </div>
        <div className="input-field">
          <input
            type="text"
            name="description"
            value={values.description}
            onChange={handleChange}
            required
          />
          <label htmlFor="description">Descripción</label>
        </div>
        <div className="input-field">
          <input
            type="number"
            name="amount"
            value={values.amount}
            onChange={handleChange}
            min={1}
            step="any"
            required
          />
          <label htmlFor="amount">Monto (Soles)</label>
        </div>
        <div className="input-field">
          <select
            name="category"
            value={values.category}
            onChange={handleChange}
            required
          >
            <option value="" disabled selected></option>
            //Si no hay un tipo Seleccionado, no cargan las categorías
            {values.type !== ""
              ? typeSelected.map((item, index) => (
                  <option key={index} value={item.name}>
                    {item.name}
                  </option>
                ))
              : null}
          </select>
          <label htmlFor="category">Categoría</label>
        </div>
        <div className="input-field">
          <input
            type="date"
            name="date"
            value={values.date}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit" className="boton-formulario">
          {editId === "" ? "AGREGAR" : "ACTUALIZAR"}
        </button>
      </form>
    </div>
  );
}

export default FormAddTransaction;
