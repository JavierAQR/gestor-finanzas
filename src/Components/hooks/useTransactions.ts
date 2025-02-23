import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { useDataContext } from "../../context/TransactionContext";
import { inputs, Transaction } from "../../context/reducer";

export function useTransactions() {
  const [editId, setEditId] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("");
  const [tableSort, setTableSort] = useState("reciente");

  const [selectedTable, setSelectedTable] = useState<Transaction[]>([]);

  const contextData = useDataContext();

  const [values, setValues] = useState<inputs>({
    description: "",
    amount: NaN,
    category: "",
    date: new Date().toISOString().split("T")[0],
    type: "",
  });

  // Metodo para agregar una transacción, asigna los valores (values) del formulario a los requeridos por el dispatch para agregar nuevos registros.
  // Maneja también la actualización, si el estado editId contiene un valor (id de registro a actualizar), primero lo borra y luego asigna los datos del formulario para el registro que contenga la id que estaba contenida en editId.

  const handlerAddTransaction = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (editId === "") {
      contextData.dispatch({
        type: "ADD",
        payload: {
          description: values.description,
          amount: values.amount,
          category: values.category,
          date: values.date,
          type: values.type,
        },
      });
    } else {
      setEditId("");
      contextData.dispatch({
        type: "UPDATE",
        payload: {
          id: editId,
          datosAct: values,
        },
      });
    }

    setValues({
      description: "",
      category: "",
      date: new Date().toISOString().split("T")[0],
      amount: NaN,
      type: "",
    });
  };

  // Metodo para eliminar una transacción tomando como parametro su id

  const handleDeleteTransaction = (id: string) => {
    contextData.dispatch({
      type: "DELETE",
      payload: id,
    });
  };

  //Metodo para editar una transacción, especificamente para que al ejecutar esta funcion, los datos del registro se coloquen en el formulario, y el id de este registro sea el nuevo valor del estado editId, para luego manejar la actualización.

  const handleUpdateTransaction = (datos: inputs, id: string) => {
    setEditId(id);
    setValues({
      amount: datos.amount,
      category: datos.category,
      date: datos.date,
      description: datos.description,
      type: datos.type,
    });
  };

  // handleChange: Función que permite modificar los valores de values con los que son seleccionados o escritos durante el formulario

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setValues({
      ...values,
      [e.target.name]: e.target.value,
    });
  };

  //handleChangeFilter: Función que maneja el cambio de estado de la cantegoría seleccionada para filtrar la tabla de transacciones.

  const handleChangeFilter = (e: ChangeEvent<HTMLSelectElement>) => {
    setCategoryFilter(e.target.value);
  };

  //Se obtiene del array de objetos de categorías (categoryArray) dos arreglos, uno que almacene los nombres de las categorías de ingresos, y el otro de los egresos.

  const expenseCategories = contextData.categoryArray.filter((item) => {
    if (item.type === "expense") {
      return item.name;
    }
  });

  const incomeCategories = contextData.categoryArray.filter((item) => {
    if (item.type === "income") {
      return item.name;
    }
  });

  // handleSortByDate: Metodo para establecer el valor de ordenamiento seleccionado en TableControls
  const handleSortByDate = (e: ChangeEvent<HTMLSelectElement>) => {
    setTableSort(e.target.value);
  };

  //Metodo para aplicar en selectedTable el valor actualizado de un array filtrado y ordenado.

  const applyFilterAndSort = () => {
    let filteredTransactions = contextData.state;
    if (categoryFilter !== "") {
      filteredTransactions = contextData.state.filter(
        (item) => item.category === categoryFilter
      );
    }

    const sortedTransactions = [...filteredTransactions].sort((a, b) => {
      const A = new Date(a.date);
      const B = new Date(b.date);
      if (tableSort === "antiguo") return A.getTime() - B.getTime();
      return B.getTime() - A.getTime();
    });

    setSelectedTable(sortedTransactions);
  };

  //Cada que cambien los valores como el filtro por categoria, el orden de la tabla o los datos orgininales, se aplica el metodo de ordenamiento y filtrado.

  useEffect(() => {
    applyFilterAndSort();
  }, [categoryFilter, tableSort, contextData.state]);

  return {
    handleChange,
    handleDeleteTransaction,
    handleUpdateTransaction,
    handlerAddTransaction,
    handleChangeFilter,
    handleSortByDate,
    setTableSort,
    tableSort,
    expenseCategories,
    incomeCategories,
    selectedTable,
    categoryFilter,
    editId,
    values,
  };
}
