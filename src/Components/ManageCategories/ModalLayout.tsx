import { useForm } from "react-hook-form";
import { Category, categoryInputs } from "../../context/reducerCategories";
import ReusableTable, { Column } from "../ReusableTable/ReusableTable";

import { useDataContext } from "../../context/TransactionContext";

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

  const { register, handleSubmit, reset } = useForm<categoryInputs>({
    defaultValues: {
      name: "",
      type: "",
    },
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
      <button onClick={closeModal}>X</button>
      <h1>Categorías</h1>
      <form onSubmit={onSubmit}>
        <input
          type="text"
          placeholder="Nombre Categoría"
          {...register("name", {
            required: {
              value: true,
              message: "El nombre es requerido",
            },
          })}
        />
        <select
          {...register("type", {
            required: {
              value: true,
              message: "El tipo es requerido",
            },
          })}
        >
          <option value="egreso">Egreso</option>
          <option value="ingreso">Ingreso</option>
        </select>
        <button type="submit">AGREGAR</button>
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
