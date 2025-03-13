import { useEffect } from "react";
import { useForm } from "react-hook-form";

import "./FormStyles.css";
import { zodResolver } from "@hookform/resolvers/zod";
import InputField from "../ReusableFormFields/InputField";
import SelectField from "../ReusableFormFields/SelectField";
import { formSchema, TformSchema } from "../../schemas/transactionSchema";
import { Category, inputs, Transaction } from "../../types";
import { initialState } from "../../store/transaction";

type Props = {
  handleAddTransaction: (data: inputs) => void;
  expenseCategories: Category[];
  incomeCategories: Category[];
  editTransaction: Transaction;
};

const FormLayout = ({
  handleAddTransaction,
  expenseCategories,
  incomeCategories,
  editTransaction,
}: Props) => {
  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm<TformSchema>({
    defaultValues: initialState,
    resolver: zodResolver(formSchema),
  });

  useEffect(() => {
    if (editTransaction !== initialState) {
      reset(editTransaction);
    } else {
      reset();
    }
  }, [editTransaction, reset]);

  const onSubmit = handleSubmit((data) => {
    handleAddTransaction(data);
    reset(initialState);
  });

  //Se obtiene el array de categorías correspondiente al tipo seleccionado
  const typeSelected =
    watch("type") === "ingreso" ? incomeCategories : expenseCategories;

  //Este array de objetos [{id: string, name: string, type: string}]
  //Es convertido a [{name: string, value: string}]
  //Para luego ser iterado en un SelectField como Options <option value={value}>{name}<option/>
  const typeSelect = typeSelected.map((item) => {
    return { name: item.name, value: item.name };
  });

  return (
    <div className="formulario-transaccion">
      <form onSubmit={onSubmit}>
        <SelectField
          name="type"
          label="Tipo"
          register={register}
          errors={errors}
          watch={watch}
          data={[
            { name: "Egreso", value: "egreso" },
            { name: "Ingreso", value: "ingreso" },
          ]}
        />

        <InputField
          name="description"
          label="Descripción"
          inputType="text"
          register={register}
          errors={errors}
          watch={watch}
        />

        <InputField
          name="amount"
          label="Monto (Soles)"
          inputType="number"
          register={register}
          errors={errors}
          watch={watch}
        />

        <SelectField
          name="category"
          label="Categoría"
          register={register}
          errors={errors}
          watch={watch}
          data={typeSelect}
          //Deshabilitado hasta que haya un tipo seleccionado.
          disabled={!watch("type") && true}
        />

        <InputField
          name="date"
          inputType="date"
          register={register}
          errors={errors}
          watch={watch}
        />

        {/* El boton dice actualizar solo si hay un id en edición. */}
        <button type="submit" className="boton-formulario">
          {editTransaction.id === "" ? "AGREGAR" : "ACTUALIZAR"}
        </button>
      </form>
    </div>
  );
};

export default FormLayout;
