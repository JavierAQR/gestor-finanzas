import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { initialState, inputs, Transaction } from "../../context/reducer";
import "./FormStyles.css";
import { Category } from "../../context/reducerCategories";
import { zodResolver } from "@hookform/resolvers/zod";
import InputField from "../ReusableFormFields/InputField";
import SelectField from "../ReusableFormFields/SelectField";
import { formSchema, TformSchema } from "../../schemas/transactionSchema";

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
  } = useForm<TformSchema>({
    resolver: zodResolver(formSchema),
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
          label="Monto"
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
          disabled={watch("type") === "" && true}
        />

        <InputField
          name="date"
          inputType="date"
          register={register}
          errors={errors}
          watch={watch}
        />
        <button type="submit" className="boton-formulario">
          {editTransaction.id === "" ? "AGREGAR" : "ACTUALIZAR"}
        </button>
      </form>
    </div>
  );
};

export default FormLayout;
