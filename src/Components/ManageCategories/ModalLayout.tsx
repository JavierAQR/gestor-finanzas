import { useForm } from "react-hook-form";
import {
  Category,
  categoryInitialInputs,
  categoryInputs,
} from "../../context/reducerCategories";
import ReusableTable, { Column } from "../ReusableTable/ReusableTable";

import { useDataContext } from "../../context/TransactionContext";
import InputField from "../ReusableFormFields/InputField";
import SelectField from "../ReusableFormFields/SelectField";
import {
  categoriesSchema,
  TcategoriesSchema,
} from "../../schemas/categoriesSchema";
import { zodResolver } from "@hookform/resolvers/zod";

interface Props {
  closeModal: () => void;
  handlerAddCategory: (data: categoryInputs) => void;
}

const ModalLayout = ({ closeModal, handlerAddCategory }: Props) => {

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
    <div className="modal">
      <button onClick={closeModal} className="btn-cerrar">
        <i className="fa-solid fa-xmark"></i>
      </button>
      <h1>Categorías</h1>
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
    </div>
  );
};

export default ModalLayout;
