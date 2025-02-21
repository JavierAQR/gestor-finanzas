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
      type: "CLEAR";
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
      const { description, amount, category, date, type } = action.payload;
      return [
        ...state,
        {
          id: uuidv4(),
          description,
          amount,
          category,
          date,
          type,
        },
      ];
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
      const { id, datosAct } = action.payload;
      return state.map((item) =>
        item.id === id ? { ...item, ...datosAct } : item
      );
    }

    case "CLEAR": {
      return (state = []);
    }

    default:
      return state;
  }
};
