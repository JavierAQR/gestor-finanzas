import { ChangeEvent, FormEvent } from "react";
import { inputs } from "../../context/reducer";

type Props = {
  handleAdd: (e: FormEvent<HTMLFormElement>) => void;
  handleClear: () => void;
  handleChange: (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
  values: inputs;
};

function FormAddTransaction({ handleAdd, handleChange, values }: Props) {
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
          <option value="comida">Comida</option>
          <option value="transporte">Transporte</option>
          <option value="salario">Salario</option>
          <option value="medicina">Medicina</option>
          <option value="snacks">Snacks/Dulces</option>
        </select>
        <input
          type="date"
          name="date"
          value={values.date}
          onChange={handleChange}
          required
        />
        <input type="submit" value="AGREGAR" />
      </form>
    </>
  );
}

export default FormAddTransaction;
