import { v4 as uuidv4 } from "uuid";

export type TransactionType = "income" | "expense";

export interface inputs {
  description: string;
  amount: number;
  category: string;
  date: string;
  type: TransactionType;
}

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
      const newState = [...state, { id: uuidv4(), ...action.payload }];
      localStorage.setItem("transactions", JSON.stringify(newState));
      return newState;
    }

    case "DELETE": {
      const id = action.payload;
      const newTrans = state.filter((item) => {
        if (item.id !== id) {
          return item;
        }
      });
      localStorage.setItem("transactions", JSON.stringify(newTrans));
      return newTrans;
    }

    case "UPDATE": {
      const updatedState = state.map((item) =>
        item.id === action.payload.id
          ? { ...item, ...action.payload.datosAct }
          : item
      );
      localStorage.setItem("transactions", JSON.stringify(updatedState));
      return updatedState;
    }

    default:
      return state;
  }
};
