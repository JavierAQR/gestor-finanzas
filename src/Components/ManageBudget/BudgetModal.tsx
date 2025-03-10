import { useForm } from "react-hook-form";
import { useMonthContext } from "../../context/MonthContext";
import { Budget, budgetForm } from "../../context/reducerBudget";
import "./styles.css";
import { zodResolver } from "@hookform/resolvers/zod";
import { budgetSchema, TbudgetSchema } from "../../schemas/budgetSchema";
import SelectField, { selectData } from "../ReusableFormFields/SelectField";
import InputField from "../ReusableFormFields/InputField";
import ReusableTable, { Column } from "../ReusableTable/ReusableTable";
import { useBudgetContext } from "../../context/BudgetContext";

interface Props {
  typeSelected: string;
  handleAddBudget: (data: budgetForm) => void;
  dataTable: Budget[];
}

const BudgetModal = ({ typeSelected, handleAddBudget, dataTable }: Props) => {
  const { categoriasDelMes } = useMonthContext();
  const { budget, setBudget } = useBudgetContext();

  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm<TbudgetSchema>({
    defaultValues: {
      budget: NaN,
      category: "",
    },
    resolver: zodResolver(budgetSchema),
  });

  const handleDelete = (id: string) => {
    setBudget({
      type: "DELETE",
      payload: id,
    });
  };

  const onSubmit = handleSubmit((data) => {
    handleAddBudget(data);
    reset();
  });

  const columns: Column<Budget>[] = [
    {
      header: "CATEGORÍA",
      key: "category",
      hide: false,
    },
    {
      header: "PRESUPUESTO",
      key: "budget",
      hide: false,
    },
  ];

  const obtenerCategoriasPorTipo = (tipo: string) => {
    return categoriasDelMes
      .filter((item) => item.type === tipo)
      .map((item) => item.name);
  };

  const categoriasPorTipo =
    typeSelected === "ingreso"
      ? obtenerCategoriasPorTipo("ingreso")
      : obtenerCategoriasPorTipo("egreso");

  //Array de las categorias ya agregadas (con respectivo presupuesto)
  const categoriasAgregadas = budget.reduce<string[]>((arr, item) => {
    arr.push(item.category);
    return arr;
  }, []);

  //Categorias para el select (se muestran las que aun no tienen presupuesto agregado)
  const categoriasFaltantes = categoriasPorTipo
    .filter((item) => !categoriasAgregadas.includes(item))
    .reduce<selectData[]>((arr, item) => {
      arr.push({
        name: item,
        value: item,
      });
      return arr;
    }, []);

  return (
    <>
      <h1>Presupuesto de {typeSelected + "s"}</h1>
      <form onSubmit={onSubmit}>
        <SelectField
          name="category"
          label="Categoría"
          register={register}
          errors={errors}
          watch={watch}
          data={categoriasFaltantes}
        />
        <InputField
          name="budget"
          label="Presupuesto"
          inputType="number"
          register={register}
          errors={errors}
          watch={watch}
        />
        <button type="submit" className="boton-formulario">
          AGREGAR
        </button>
      </form>
      <ReusableTable
        data={dataTable}
        columns={columns}
        handleDelete={handleDelete}
      />
    </>
  );
};

export default BudgetModal;
