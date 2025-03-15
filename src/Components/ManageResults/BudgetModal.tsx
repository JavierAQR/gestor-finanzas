import { useForm } from "react-hook-form";
import { useMonthContext } from "../../context/MonthContext";
import "./Styles.css";
import { zodResolver } from "@hookform/resolvers/zod";
import { budgetSchema, TbudgetSchema } from "../../schemas/budgetSchema";
import SelectField from "../FormFields/SelectField";
import InputField from "../FormFields/InputField";
import ReusableTable, { Column } from "../Table/ReusableTable";
import { Budget, budgetForm } from "../../types";
import { useBudgetStore } from "../../store/budget";
import FormContainer from "../FormFields/FormContainer";
import { useEffect, useState } from "react";
import { useCategoryStore } from "../../store/category";

interface Props {
  typeFilter: string;
  handleDelete: (id: string) => void;
  dataTable: Budget[];
}

const BudgetModal = ({ typeFilter, dataTable, handleDelete }: Props) => {
  const { categoriasDelMes } = useMonthContext();
  const budget = useBudgetStore((b) => b.budget);
  const addNewBudget = useBudgetStore((b) => b.addNewBudget);
  const updateBudget = useBudgetStore((state) => state.updateBudget);
  const categories = useCategoryStore((state) => state.categories);
  const { monthSelected } = useMonthContext();
  const [editBudget, setEditBudget] = useState<Budget | null>(null);

  const columns: Column<Budget>[] = [
    {
      header: "CATEGORÍA",
      key: "category",
      hide: false,
      class: "inactivo",
    },
    {
      header: "PRESUPUESTO",
      key: "budget",
      hide: false,
      class: "inactivo",
    },
  ];
  //Metodo para buscar el tipo correspondiente a la categoría pasada por parámetro
  const buscarTipo = (category: string) => {
    const categoria = categories.find((item) => item.name === category);
    if (categoria) {
      return categoria.type;
    } else {
      return "";
    }
  };

  //Metodo para agregar un nuevo presupuesto. Obtiene como type el que corresponde a su category, y como date la fecha seleccionada en el contexto.
  const handleAddBudget = (data: budgetForm) => {
    if (!editBudget) {
      addNewBudget({
        ...data,
        type: buscarTipo(data.category),
        date: monthSelected,
      });
    } else {
      setEditBudget(null);
      updateBudget(editBudget.id, {
        ...data,
        type: buscarTipo(data.category),
        date: monthSelected,
      });
    }
  };

  const handleUpdate = (inputs: Budget) => {
    setEditBudget(inputs);
  };

  //Array de categorias correspondientes al tipo seleccionado
  const typeCategories = categoriasDelMes
    .filter((item) => item.type === typeFilter)
    .map((item) => item.name);

  // Convertir budgetCategories a un Set para búsquedas eficientes.
  // budgetCategories ahora es un objeto con las categorias con presupuesto.
  const budgetCategoriesSet = new Set(budget.map((item) => item.category));

  // Categorías para el select (se muestran las que aún no tienen presupuesto)
  const pendingCategories = typeCategories.filter(
    (item) => !budgetCategoriesSet.has(item)
  );

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

  const onSubmit = handleSubmit((data) => {
    handleAddBudget(data);
    reset({
      budget: NaN,
      category: "",
    });
  });

  useEffect(() => {
    if (editBudget) {
      reset(editBudget);
    }
  }, [editBudget]);

  return (
    <>
      <FormContainer onSubmit={onSubmit} isEdit={Boolean(editBudget)}>
        <>
          <SelectField
            name="category"
            label="Categoría"
            register={register}
            errors={errors}
            watch={watch}
            data={!editBudget ? pendingCategories : typeCategories}
          />
          <InputField
            name="budget"
            label="Presupuesto"
            inputType="number"
            register={register}
            errors={errors}
            watch={watch}
          />
        </>
      </FormContainer>
      <ReusableTable
        data={dataTable}
        columns={columns}
        handleDelete={handleDelete}
        handleUpdate={handleUpdate}
      />
    </>
  );
};

export default BudgetModal;
