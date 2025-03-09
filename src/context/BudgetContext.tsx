import {
  createContext,
  Dispatch,
  ReactNode,
  useContext,
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
  const [budget, setBudget] = useReducer(reducerBudget, []);

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
