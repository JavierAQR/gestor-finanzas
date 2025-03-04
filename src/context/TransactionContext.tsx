import {
  createContext,
  Dispatch,
  ReactNode,
  useContext,
  useEffect,
  useReducer,
} from "react";
import { Action, reducer, Transaction } from "./reducer";
import {
  ActionCategory,
  Category,
  defaultCategories,
  reducerCategories,
} from "./reducerCategories";

type Props = {
  children: ReactNode;
};

interface ContextType {
  state: Transaction[];
  dispatch: Dispatch<Action>;
  categoryArray: Category[];
  setCategoryArray: Dispatch<ActionCategory>;
}

export const DataContext = createContext<ContextType | null>(null);

export function TransactionContextProvider({ children }: Props) {
  const initialState: Transaction[] = JSON.parse(
    localStorage.getItem("transactions") || "[]"
  );

  const storedCategories = localStorage.getItem("categories");

  const initialStateCategories: Category[] = storedCategories
    ? JSON.parse(storedCategories)
    : defaultCategories;

  const [state, dispatch] = useReducer(reducer, initialState);

  const [categoryArray, setCategoryArray] = useReducer(
    reducerCategories,
    initialStateCategories
  );

  useEffect(() => {
    localStorage.setItem("transactions", JSON.stringify(state));
  }, [state]);

  useEffect(() => {
    localStorage.setItem("categories", JSON.stringify(categoryArray));
  }, [categoryArray]);

  const valor = {
    state,
    dispatch,
    categoryArray,
    setCategoryArray,
  };

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
