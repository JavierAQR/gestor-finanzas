import {
  createContext,
  Dispatch,
  ReactNode,
  useContext,
  useEffect,
  useReducer,
  useState,
} from "react";
import { Action, reducer, Transaction } from "./reducer";

type Props = {
  children?: ReactNode;
};

interface ContextType {
  state: Transaction[];
  dispatch: Dispatch<Action>;
  categoryArray: string[];
}

export const DataContext = createContext<ContextType | null>(null);

export function TransactionContextProvider({ children }: Props) {
  const initialState: Transaction[] = JSON.parse(
    localStorage.getItem("transactions") || "[]"
  );

  const [state, dispatch] = useReducer(reducer, initialState);
  const [categoryArray, setCategoryArray] = useState([
    "Comida",
    "Transporte",
    "Salario",
    "Medicina",
    "Snacks/Dulces",
  ]);

  useEffect(() => {
    localStorage.setItem("transactions", JSON.stringify(state));
  }, [state]);

  const valor = { state, dispatch, categoryArray, setCategoryArray };

  return <DataContext.Provider value={valor}>{children}</DataContext.Provider>;
}

export function useDataContext() {
  const contextData = useContext(DataContext);

  if (!contextData) {
    throw new Error(
      "useContext debe usarse dentro de TransactionContextProvider"
    );
  }

  return contextData;
}
