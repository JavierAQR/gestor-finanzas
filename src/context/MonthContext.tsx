import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useContext,
  useState,
} from "react";
import { Transaction } from "./reducer";

interface Props {
  children: ReactNode;
}

interface ContextType {
  monthTransactions: Transaction[];
  setMonthTransactions: Dispatch<SetStateAction<Transaction[]>>;
}

export const MonthContext = createContext<ContextType | null>(null);

export const MonthContextProvider = ({ children }: Props) => {
  const [monthTransactions, setMonthTransactions] = useState<Transaction[]>([]);

  const valor = { monthTransactions, setMonthTransactions };

  return (
    <MonthContext.Provider value={valor}>{children}</MonthContext.Provider>
  );
};

export function useMonthContext() {
  const contextMonth = useContext(MonthContext);

  if (!contextMonth) {
    throw new Error(
      "useContext debe usarse dentro de TransactionContextProvider"
    );
  }

  return contextMonth;
}
