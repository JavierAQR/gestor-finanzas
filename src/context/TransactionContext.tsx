import {
  createContext,
  Dispatch,
  ReactNode,
  useContext,
  useEffect,
  useReducer,
} from "react";
import { Action, reducer, Transaction } from "./reducer";

type Props = {
  children?: ReactNode;
};

interface ContextType {
  state: Transaction[];
  dispatch: Dispatch<Action>;
}

export const DataContext = createContext<ContextType | null>(null);

export function TransactionContextProvider({ children }: Props) {
  const initialState: Transaction[] = JSON.parse(
    localStorage.getItem("transactions") || "[]"
  );

  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    localStorage.setItem("transactions", JSON.stringify(state));
  }, [state]);

  const valor = { state, dispatch };

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
