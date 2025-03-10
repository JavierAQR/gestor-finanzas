import { useForm } from "react-hook-form";
import {
  Category,
  categoryInitialInputs,
  categoryInputs,
} from "../../context/reducerCategories";
import ReusableTable, { Column } from "../ReusableTable/ReusableTable";
import "./Styles.css";

import { useDataContext } from "../../context/TransactionContext";
import InputField from "../ReusableFormFields/InputField";
import SelectField from "../ReusableFormFields/SelectField";
import {
  categoriesSchema,
  TcategoriesSchema,
} from "../../schemas/categoriesSchema";
import { zodResolver } from "@hookform/resolvers/zod";

interface Props {
  handlerAddCategory: (data: categoryInputs) => void;
}

const CategoriesLayout = ({ handlerAddCategory }: Props) => {
  const columns: Column<Category>[] = [
    {
      header: "NOMBRE",
      key: "name",
      hide: false,
    },
    {
      header: "TIPO",
      key: "type",
      hide: false,
    },
  ];

  const { categoryArray, setCategoryArray } = useDataContext();

  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm<TcategoriesSchema>({
    defaultValues: categoryInitialInputs,
    resolver: zodResolver(categoriesSchema),
  });

  const handleDelete = (id: string) => {
    setCategoryArray({
      type: "DELETE",
      payload: id,
    });
  };

  const onSubmit = handleSubmit((data) => {
    handlerAddCategory(data);
    reset();
  });

  return (
    <>
      <form onSubmit={onSubmit}>
        <InputField
          name="name"
          label="Nombre"
          inputType="text"
          register={register}
          errors={errors}
          watch={watch}
        />
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
        <button type="submit" className="boton-formulario">
          AGREGAR
        </button>
      </form>
      <ReusableTable
        data={categoryArray}
        columns={columns}
        handleDelete={handleDelete}
      />
    </>
  );
};

export default CategoriesLayout;
