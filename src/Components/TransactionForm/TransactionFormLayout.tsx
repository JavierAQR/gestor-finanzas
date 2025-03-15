import { useEffect } from "react";
import { useForm } from "react-hook-form";
import "./Styles.css";
import { zodResolver } from "@hookform/resolvers/zod";
import InputField from "../FormFields/InputField";
import SelectField from "../FormFields/SelectField";
import { formSchema, TformSchema } from "../../schemas/transactionSchema";
import { Category, inputs, Transaction } from "../../types";
import { initialState } from "../../store/transaction";
import FormContainer from "../FormFields/FormContainer";

type Props = {
  handleAddTransaction: (data: inputs) => void;
  expenseCategories: Category[];
  incomeCategories: Category[];
  editTransaction: Transaction | null;
};

const TransactionFormLayout = ({
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
    if (editTransaction) {
      reset(editTransaction);
    }
  }, [editTransaction]);

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
  const typeSelect = typeSelected.map((item) => item.name);

  return (
    <>
      <div className="formulario-transaccion">
        <FormContainer onSubmit={onSubmit} isEdit={Boolean(editTransaction)}>
          <>
            <SelectField
              name="type"
              label="Tipo"
              register={register}
              errors={errors}
              watch={watch}
              data={["ingreso", "egreso"]}
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
          </>
        </FormContainer>
      </div>
    </>
  );
};

export default TransactionFormLayout;
