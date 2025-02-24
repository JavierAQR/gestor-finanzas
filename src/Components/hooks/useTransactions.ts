import { ChangeEvent,  useEffect, useState } from "react";
import { useDataContext } from "../../context/TransactionContext";
import { initialState, inputs, Transaction } from "../../context/reducer";

export function useTransactions() {
  const [editTransaction, setEditTransaction] = useState<Transaction>(initialState);
  const [categoryFilter, setCategoryFilter] = useState("");
  const [tableSort, setTableSort] = useState("reciente");
  const [selectedTable, setSelectedTable] = useState<Transaction[]>([]);

  const contextData = useDataContext();



  // Metodo para agregar una transacción, asigna los valores (values) del formulario a los requeridos por el dispatch para agregar nuevos registros.
  // Maneja también la actualización, si el estado editTransaction contiene un valor (id de registro a actualizar), primero lo borra y luego asigna los datos del formulario para el registro que contenga la id que estaba contenida en editTransaction.

  const handlerAddTransaction = (data: inputs) => {
    if (editTransaction === initialState) {
      contextData.dispatch({
        type: "ADD",
        payload: {
          description: data.description,
          amount: data.amount,
          category: data.category,
          date: data.date,
          type: data.type,
        },
      });
    } else {
      setEditTransaction(initialState);
      contextData.dispatch({
        type: "UPDATE",
        payload: {
          id: editTransaction.id,
          datosAct: data,
        },
      });
    }
  };

  // Metodo para eliminar una transacción tomando como parametro su id

  const handleDeleteTransaction = (id: string) => {
    contextData.dispatch({
      type: "DELETE",
      payload: id,
    });
  };

  //Metodo para editar una transacción, especificamente para que al ejecutar esta funcion, los datos del registro se coloquen en el formulario, y el id de este registro sea el nuevo valor del estado editTransaction, para luego manejar la actualización.

  const handleUpdateTransaction = (datos: Transaction) => {
    setEditTransaction(datos);
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
    editTransaction,
  };
}
