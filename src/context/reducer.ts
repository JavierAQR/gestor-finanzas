import { v4 as uuidv4 } from "uuid";

export type TransactionType = "ingreso" | "egreso" | "";

export interface inputs {
  description: string;
  amount: number;
  category: string;
  date: string;
  type: TransactionType;
}

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

export interface Transaction {
  id: string;
  description: string;
  amount: number;
  category: string;
  date: string;
  type: TransactionType;
}

export type Action =
  | {
      type: "ADD";
      payload: inputs;
    }
  | {
      type: "DELETE";
      payload: string;
    }
  | {
      type: "UPDATE";
      payload: {
        id: string;
        datosAct: inputs;
      };
    };

export const reducer = (
  state: Transaction[],
  action: Action
): Transaction[] => {
  switch (action.type) {
    case "ADD": {
      const newState = [{ id: uuidv4(), ...action.payload }, ...state];
      return newState;
    }

    case "DELETE": {
      const id = action.payload;
      const newTrans = state.filter((item) => {
        if (item.id !== id) {
          return item;
        }
      });

      return newTrans;
    }

    case "UPDATE": {
      const updatedState = state.map((item) =>
        item.id === action.payload.id
          ? { ...item, ...action.payload.datosAct }
          : item
      );

      return updatedState;
    }

    default:
      return state;
  }
};
