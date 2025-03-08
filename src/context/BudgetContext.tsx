import {
  createContext,
  Dispatch,
  ReactNode,
  useContext,
  useReducer,
} from "react";
import { ActionBudget, Budget, reducerBudget } from "./reducerBudget";
import { useMonthContext } from "./MonthContext";

type Props = {
  children: ReactNode;
};

export interface ContextType {
  budget: Budget[];
  setBudget: Dispatch<ActionBudget>;
}

export const BudgetContext = createContext<ContextType | null>(null);

export function BudgetContextProvider({ children }: Props) {
  const [budget, setBudget] = useReducer(reducerBudget, []);
  const { keysMonths } = useMonthContext();

  //--Aqui podria traer keysMonths?
  //Si la fecha existe dentro de las fechas registradas...
  //... y si la fecha no forma parte del objeto, se agrega la fecha y se asigna un arreglo vacío
  //Si la fecha ya existe en el objeto, se pushea el presupuesto a la fecha correspondiente.
  //Lo de que existe en las fechas registradas lo podría agregar luego, en el metodo para agregar...
  //Y ahí mismo agrego logica para que no se repitan las transacciones
  //Y solo se pueda agregar categorias que hayan sido registradas en esa fecha
  //Para eso debería crear un arreglo con las categorias correspondientes a cada fecha
  //Javier de manana te deseo suerte, me voy a jugar hogwarts
  const obtenerPresupuestosPorFecha = (budget: Budget[]) => {
    return budget.reduce<{ [key: string]: Budget[] }>((obj, item) => {
      if (keysMonths.includes(item.date)) {
        if (!obj[item.date]) {
          obj[item.date] = [];
        }
        obj[item.date].push(item);
      }
      return obj;
    }, {});
  };

  const presupuestosPorFecha = obtenerPresupuestosPorFecha(budget);

  const valor = {
    budget,
    setBudget,
  };

  return (
    <BudgetContext.Provider value={valor}>{children}</BudgetContext.Provider>
  );
}

export function useBudgetContext() {
  const budgetData = useContext(BudgetContext);

  if (!budgetData) {
    throw new Error(
      "useContext debe usarse dentro de TransactionContextProvider"
    );
  }

  return budgetData;
}
