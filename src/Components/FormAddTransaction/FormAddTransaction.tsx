import { ChangeEvent, FormEvent } from "react";
import { inputs } from "../../context/reducer";
import { CategoryArray } from "../../context/TransactionContext";

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
    <>
      <form action="" onSubmit={handleAdd}>
        <select
          name="type"
          value={values.type}
          onChange={handleChange}
          required
        >
          <option value="expense">Egreso</option>
          <option value="income">Ingreso</option>
        </select>
        <input
          type="text"
          name="description"
          placeholder="Descripción"
          value={values.description}
          onChange={handleChange}
          required
        />
        <input
          type="number"
          name="amount"
          placeholder="Monto"
          value={values.amount}
          onChange={handleChange}
          min={1}
          step="any"
          required
        />
        <select
          name="category"
          value={values.category}
          onChange={handleChange}
          required
        >
          <option value="">--Elegir Categoría--</option>
          {typeSelected.map((item, index) => (
            <option key={index} value={item.name}>
              {item.name}
            </option>
          ))}
        </select>
        <input
          type="date"
          name="date"
          value={values.date}
          onChange={handleChange}
          required
        />
        <input type="submit" value={editId === "" ? "AGREGAR" : "ACTUALIZAR"} />
      </form>
    </>
  );
}

export default FormAddTransaction;
