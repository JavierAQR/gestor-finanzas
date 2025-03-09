import {
  createContext,
  Dispatch,
  ReactNode,
  useContext,
  useEffect,
  useReducer,
} from "react";
import { ActionBudget, Budget, reducerBudget } from "./reducerBudget";

type Props = {
  children: ReactNode;
};

export interface ContextType {
  budget: Budget[];
  setBudget: Dispatch<ActionBudget>;
}

export const BudgetContext = createContext<ContextType | null>(null);

export function BudgetContextProvider({ children }: Props) {
  const storedBudgets = localStorage.getItem("budgets");

  const initialStateBudget: Budget[] = storedBudgets
    ? JSON.parse(storedBudgets)
    : [];

  const [budget, setBudget] = useReducer(reducerBudget, initialStateBudget);

  useEffect(() => {
    localStorage.setItem("budgets", JSON.stringify(budget));
  });

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
