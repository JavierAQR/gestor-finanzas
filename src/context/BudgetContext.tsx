import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useContext,
  useEffect,
  useState,
} from "react";
import { useMonthContext } from "./MonthContext";

interface Props {
  children: ReactNode;
}

interface BudgetItem {
  category: string;
  budget: number;
}

interface MonthlyBudget {
  egresos: BudgetItem[];
  ingresos: BudgetItem[];
}

interface BudgetData {
  [key: string]: MonthlyBudget;
}

export interface ContextType {
  budget: BudgetData;
  setBudget: Dispatch<SetStateAction<BudgetData>>;
}

export const BudgetContext = createContext<ContextType | null>(null);

export function BudgetContextProvider({ children }: Props) {
  const { transaccionesPorMes, keysMonths } = useMonthContext();

  const obtenerPresupuestos = (tipo: string, fecha: string) => {
    return transaccionesPorMes[fecha]
      .filter((item) => item.type === tipo)
      .reduce<string[]>((arr, categoria) => {
        if (!arr.includes(categoria.category)) {
          arr.push(categoria.category);
        }
        return arr;
      }, [])
      .map((item) => {
        return {
          category: item,
          budget: 0,
        };
      });
  };

  const presupuestos = keysMonths.reduce<BudgetData>((obj, item) => {
    obj[item] = {
      ingresos: obtenerPresupuestos("ingreso", item),
      egresos: obtenerPresupuestos("egreso", item),
    };
    return obj;
  }, {});

  const [budget, setBudget] = useState(presupuestos);

  useEffect(() => {
    setBudget(presupuestos);
  }, [transaccionesPorMes]);

  /* presupuestos["2025-03"]["egresos"][0]["budget"] = 100; */

  console.log(budget);

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
