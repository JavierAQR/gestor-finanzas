import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useContext,
  useState,
} from "react";
import { TransactionType } from "../types";

interface Props {
  children: ReactNode;
}

export interface FilterContextType {
  categoryFilter: string;
  setCategoryFilter: Dispatch<SetStateAction<string>>;
  typeFilter: TransactionType;
  setTypeFilter: Dispatch<SetStateAction<TransactionType>>;
}

export const FilterContext = createContext<FilterContextType | null>(null);

export function FilterContextProvider({ children }: Props) {
  const [categoryFilter, setCategoryFilter] = useState("");
  const [typeFilter, setTypeFilter] = useState<TransactionType>("");

  const valor = {
    categoryFilter,
    typeFilter,
    setCategoryFilter,
    setTypeFilter,
  };

  return (
    <FilterContext.Provider value={valor}>{children}</FilterContext.Provider>
  );
}

export function useFilterContext() {
  const filterContext = useContext(FilterContext);

  if (!filterContext) {
    throw new Error("useContext debe usarse dentro de FilterContextProvider");
  }

  return filterContext;
}
