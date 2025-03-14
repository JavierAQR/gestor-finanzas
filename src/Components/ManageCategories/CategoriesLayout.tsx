import { useForm } from "react-hook-form";
import ReusableTable, { Column } from "../Table/ReusableTable";
import "./Styles.css";
import InputField from "../FormFields/InputField";
import SelectField from "../FormFields/SelectField";
import {
  categoriesSchema,
  TcategoriesSchema,
} from "../../schemas/categoriesSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Category, categoryInputs } from "../../types";
import { useCategoryStore } from "../../store/category";
import { useEffect, useState } from "react";
import FormContainer from "../FormFields/FormContainer";

const CategoriesLayout = () => {
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
  const [editCategory, setEditCategory] = useState<Category | null>(null);
  const categories = useCategoryStore((state) => state.categories);
  const deleteCategory = useCategoryStore((state) => state.deleteCategory);
  const updateCategory = useCategoryStore((state) => state.updateCategory);
  const addNewCategory = useCategoryStore((state) => state.addNewCategory);

  const handleDelete = (id: string) => {
    deleteCategory(id);
  };

  //Funcion para el boton de editar en la tabla
  //Obtiene la data del item seleccionado
  const handleUpdate = (inputs: Category) => {
    setEditCategory(inputs);
  };

  const handleAddCategory = (data: categoryInputs) => {
    if (!editCategory) {
      addNewCategory(data);
    } else {
      setEditCategory(null);
      updateCategory(editCategory.id, data);
    }
  };
  console.log(editCategory);

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

  const onSubmit = handleSubmit((data) => {
    handleAddCategory(data);
    reset({
      name: "",
      type: "",
    });
  });

  useEffect(() => {
    if (editCategory) {
      reset(editCategory);
    }
  }, [editCategory]);

  return (
    <>
      <FormContainer onSubmit={onSubmit} isEdit={Boolean(editCategory)}>
        <>
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
        </>
      </FormContainer>
      <ReusableTable
        data={categories}
        columns={columns}
        handleUpdate={handleUpdate}
        handleDelete={handleDelete}
      />
    </>
  );
};

export default CategoriesLayout;
