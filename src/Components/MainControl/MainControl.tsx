import { useState } from "react";
import BalanceTotal from "../BalanceTotal/BalanceTotal";
import { DisplayTransactions } from "../TableTransaction";
import { FormContainer } from "../FormTransaction";
import { TableControlsContainer } from "../TableControls";
import { initialState, Transaction } from "../../context/reducer";
import ErrorBoundary from "../../ErrorBoundary";

function MainControl() {
  const [editTransaction, setEditTransaction] =
    useState<Transaction>(initialState);

  const [selectedTable, setSelectedTable] = useState<Transaction[]>([]);

  // Obtener la fecha actual
  const currentDate = new Date();

  // Obtener el mes actual formateado MM
  const formattedMonth =
    currentDate.getMonth() < 10
      ? `0${currentDate.getMonth() + 1}`
      : currentDate.getMonth() + 1;

  // Obtener la fecha actual en formato YYYY-MM
  const fechaActual = `${currentDate.getFullYear()}-${formattedMonth}`;

  // Variable de estado para el mes seleccionado, cuyo valor inicial es el de el mes actual
  const [monthSelected, setMonthSelected] = useState(fechaActual);

  return (
    <>
      <FormContainer
        editTransaction={editTransaction}
        setEditTransaction={setEditTransaction}
      />
      <ErrorBoundary>
        <BalanceTotal selectedTable={selectedTable} />
        <TableControlsContainer
          setSelectedTable={setSelectedTable}
          monthSelected={monthSelected}
          setMonthSelected={setMonthSelected}
        />
        <DisplayTransactions
          selectedTable={selectedTable}
          setEditTransaction={setEditTransaction}
        />
      </ErrorBoundary>
    </>
  );
}

export default MainControl;
