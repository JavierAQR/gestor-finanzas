import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useContext,
  useState,
} from "react";
import { Transaction } from "./reducer";
import { useDataContext } from "./TransactionContext";

interface Props {
  children: ReactNode;
}

export interface ContextType {
  monthSelected: string;
  setMonthSelected: Dispatch<SetStateAction<string>>;
  keysMonths: string[];
  transaccionesDelMes: Transaction[];
}

export const MonthContext = createContext<ContextType | null>(null);

export function MonthTransactionProvider({ children }: Props) {
  const { state } = useDataContext();

  // Obtener la fecha actual
  const currentDate = new Date();

  // Obtener el mes actual formateado MM
  const formattedMonth =
    currentDate.getMonth() < 10
      ? `0${currentDate.getMonth() + 1}`
      : currentDate.getMonth() + 1;

  // Obtener la fecha actual en formato YYYY-MM
  const fechaActual = `${currentDate.getFullYear()}-${formattedMonth}`;

  const [monthSelected, setMonthSelected] = useState(fechaActual);

  function agruparPorFecha(transacciones: Transaction[]) {
    return transacciones.reduce<{
      [key: string]: Transaction[];
    }>((obj, item) => {
      const monthKey = item.date.slice(0, 7);
      if (!obj[monthKey]) {
        obj[monthKey] = [];
      }
      obj[monthKey].push(item);
      return obj;
    }, {});
  }

  const transaccionesPorMes = agruparPorFecha(state);

  //Array con las todas las claves del objeto historyTransactions (los meses)
  const keysMonths = Object.keys(transaccionesPorMes).sort((a, b) =>
    b.localeCompare(a)
  );

  //Array con todas las transacciones del mes seleccionado o del primer mes disponible
  const transaccionesDelMes =
    transaccionesPorMes[monthSelected] ||
    transaccionesPorMes[keysMonths[0]] ||
    [];

  const valor = {
    monthSelected,
    setMonthSelected,
    keysMonths,
    transaccionesDelMes,
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
