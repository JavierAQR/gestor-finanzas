import { ChangeEvent, Dispatch, SetStateAction } from "react";
import MonthSelectLayout from "./MonthSelectLayout";
import { Transaction } from "../../context/reducer";
import { useDataContext } from "../../context/TransactionContext";

interface Props {
  monthSelected: string;
  setMonthSelected: Dispatch<SetStateAction<string>>;
  setMonthTransactions: Dispatch<SetStateAction<Transaction[]>>;
}

const MonthSelectContainer = ({
  monthSelected,
  setMonthSelected,
  setMonthTransactions,
}: Props) => {
  const contextData = useDataContext();

  const handleMonth = (e: ChangeEvent<HTMLSelectElement>) => {
    setMonthSelected(e.target.value);
  };

  // Crear un objeto donde las keys sean los meses (YYYY-MM) y sus valores un array con objetos cuyas fechas correspondan a la key
  const historyTransactions = contextData.state.reduce<{
    [key: string]: Transaction[];
  }>((obj, item) => {
    const monthKey = item.date.slice(0, 7);
    if (!obj[monthKey]) {
      obj[monthKey] = [];
    }

    obj[monthKey].push(item);

    return obj;
  }, {});

  //Array con las todas las claves del objeto historyTransactions (los meses)
  const keysHistoryTransactions = Object.keys(historyTransactions).sort(
    (a, b) => b.localeCompare(a)
  );

  setMonthTransactions(historyTransactions[monthSelected]);

  return (
    <>
      <MonthSelectLayout
        monthSelected={monthSelected}
        handleMonth={handleMonth}
        keysHistoryTransactions={keysHistoryTransactions}
      />
    </>
  );
};

export default MonthSelectContainer;
