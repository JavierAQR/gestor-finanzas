import {
  createContext,
  Dispatch,
  ReactNode,
  useContext,
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
  const [state, dispatch] = useReducer(reducer, []);

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
