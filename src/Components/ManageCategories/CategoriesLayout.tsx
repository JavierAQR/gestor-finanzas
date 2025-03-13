import { useForm } from "react-hook-form";
import ReusableTable, { Column } from "../ReusableTable/ReusableTable";
import "./Styles.css";
import InputField from "../ReusableFormFields/InputField";
import SelectField from "../ReusableFormFields/SelectField";
import {
  categoriesSchema,
  TcategoriesSchema,
} from "../../schemas/categoriesSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Category, categoryInputs } from "../../types";
import { useCategoryStore } from "../../store/category";

interface Props {
  handleAddCategory: (data: categoryInputs) => void;
}

const CategoriesLayout = ({ handleAddCategory }: Props) => {
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

  const categories = useCategoryStore((state) => state.categories);
  const deleteCategory = useCategoryStore((state) => state.deleteCategory);

  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm<TcategoriesSchema>({
    defaultValues: {
      name: "",
      type: "",
    },
    resolver: zodResolver(categoriesSchema),
  });

  const handleDelete = (id: string) => {
    deleteCategory(id);
  };

  const onSubmit = handleSubmit((data) => {
    handleAddCategory(data);
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
        data={categories}
        columns={columns}
        handleDelete={handleDelete}
      />
    </>
  );
};

export default CategoriesLayout;
