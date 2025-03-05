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

  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm<categoryInputs>({
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
      <button onClick={closeModal} className="btn-cerrar">
        <i className="fa-solid fa-xmark"></i>
      </button>
      <h1>Categorías</h1>
      <form onSubmit={onSubmit}>
        <div className={`input-field ${watch("type") ? "filled" : ""}`}>
          <input
            type="text"
            {...register("name", {
              required: {
                value: true,
                message: "El nombre es requerido",
              },
            })}
          />
          <label>Nombre</label>
          {errors.name && (
            <span className="error-message">{errors.name.message}</span>
          )}
        </div>
        <div className={`input-field ${watch("type") ? "filled" : ""}`}>
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
          <label>Tipo</label>
          {errors.type && (
            <span className="error-message">{errors.type.message}</span>
          )}
        </div>
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
