import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useContext,
  useState,
} from "react";

import { Transaction, TransactionType } from "../types";
import { useTransactionStore } from "../store/transaction";

interface Props {
  children: ReactNode;
}

interface categoriasMes {
  name: string;
  type: TransactionType;
}

export interface ContextType {
  monthSelected: string;
  setMonthSelected: Dispatch<SetStateAction<string>>;
  keysMonths: string[];
  transaccionesDelMes: Transaction[];
  categoriasDelMes: categoriasMes[];
}

export const MonthContext = createContext<ContextType | null>(null);

export function MonthTransactionProvider({ children }: Props) {
  const transactions = useTransactionStore((state) => state.transactions);

  // Obtener la fecha actual
  const currentDate = new Date();

  // Obtener el mes actual formateado MM
  const formattedMonth =
    currentDate.getMonth() < 10
      ? `0${currentDate.getMonth() + 1}`
      : currentDate.getMonth() + 1;

  // Obtener la fecha actual en formato YYYY-MM
  const fechaActual = `${currentDate.getFullYear()}-${formattedMonth}`;

  //Estado para manejar el mes selecciona, el que por defecto será el actual
  const [monthSelected, setMonthSelected] = useState(fechaActual);

  //Obtener las fechas registradas
  const keysMonths = Array.from(
    new Set(
      transactions
        .map((item) => item.date.slice(0, 7))
        .sort((a, b) => b.localeCompare(a))
    )
  );

  //Array con todas las transacciones del mes elegido
  const transaccionesDelMes =
    transactions.filter((item) => item.date.slice(0, 7) === monthSelected) ||
    [];

  const categoriasDelMes = transaccionesDelMes.reduce<{
    map: Map<string, categoriasMes>;
    arr: categoriasMes[];
  }>(
    (acc, current) => {
      if (!acc.map.has(current.category)) {
        const categoria = {
          name: current.category,
          type: current.type,
        };
        acc.map.set(current.category, categoria); // Almacena en el Map
        acc.arr.push(categoria); // Almacena en el array
      }
      return acc;
    },
    { map: new Map(), arr: [] }
  ).arr;



  const valor = {
    monthSelected,
    setMonthSelected,
    keysMonths,
    transaccionesDelMes,
    categoriasDelMes,
  };

  return (
    <MonthContext.Provider value={valor}>{children}</MonthContext.Provider>
  );
}

export function useMonthContext() {
  const contextMonth = useContext(MonthContext);

  if (!contextMonth) {
    throw new Error("useContext debe usarse dentro de MonthContextProvider");
  }

  return contextMonth;
}
