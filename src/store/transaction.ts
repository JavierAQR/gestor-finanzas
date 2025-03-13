import { v4 as uuidv4 } from "uuid";
import { create } from "zustand";
import { inputs, Transaction } from "../types";
import { persist } from "zustand/middleware";

//Se obtiene la fecha actual para el valor inicial de date
const date = new Date();
const year = date.getFullYear();
const month = String(date.getMonth() + 1).padStart(2, "0"); // Meses van de 0 a 11
const day = String(date.getDate()).padStart(2, "0");
const formattedDate = `${year}-${month}-${day}`;

//Valores iniciales de una transaccion
export const initialState: Transaction = {
  id: "",
  description: "",
  amount: NaN,
  category: "",
  date: formattedDate,
  type: "",
};

interface transactionState {
  transactions: Transaction[];
  addNewTransaction: (inputs: inputs) => void;
  deleteTransaction: (id: string) => void;
  updateTransaction: (id: string, datosAct: inputs) => void;
}

export const useTransactionStore = create<transactionState>()(
  persist(
    (set, get) => {
      return {
        transactions: [],
        addNewTransaction: (inputs: inputs) => {
          const { transactions } = get();
          const newTrasactions = [
            {
              id: uuidv4(),
              ...inputs,
            },
            ...transactions,
          ];
          set({ transactions: newTrasactions });
        },
        deleteTransaction: (id: string) => {
          const { transactions } = get();
          const newTransactions = transactions.filter((tr) => {
            if (tr.id !== id) {
              return tr;
            }
          });
          set({ transactions: newTransactions });
        },
        updateTransaction: (id: string, datosAct: inputs) => {
          const { transactions } = get();
          const updateTransactions = transactions.map((tr) => {
            if (tr.id === id) {
              return {
                ...tr,
                ...datosAct,
              };
            }
            return tr;
          });
          set({ transactions: updateTransactions });
        },
      };
    },
    {
      name: "transactions",
    }
  )
);
