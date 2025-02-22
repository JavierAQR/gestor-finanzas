import { ChangeEvent, FormEvent } from "react";
import { inputs } from "../../context/reducer";
import { useDataContext } from "../../context/TransactionContext";

type Props = {
  handleAdd: (e: FormEvent<HTMLFormElement>) => void;
  handleClear: () => void;
  handleChange: (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
  editId: string;
  values: inputs;
};

function FormAddTransaction({
  handleAdd,
  handleChange,
  editId,
  values,
}: Props) {
  const contextData = useDataContext();

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
          required
        />
        <select
          name="category"
          value={values.category}
          onChange={handleChange}
          required
        >
          <option value="">--Elegir--</option>
          {contextData.categoryArray.map((item, index) => (
            <option key={index} value={item}>
              {item}
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
