import { v4 as uuidv4 } from "uuid";
import { TransactionType } from "./reducer";

export interface budgetForm {
  category: string;
  budget: number;
}

export interface budgetInputs extends budgetForm {
  date: string;
  type: TransactionType;
}

export interface Budget extends budgetInputs {
  id: string;
}

export type ActionBudget =
  | {
      type: "ADD";
      payload: budgetInputs;
    }
  | {
      type: "DELETE";
      payload: string;
    };

export const reducerBudget = (
  budget: Budget[],
  action: ActionBudget
): Budget[] => {
  switch (action.type) {
    case "ADD": {
      const newBudget = [{ id: uuidv4(), ...action.payload }, ...budget];
      return newBudget;
    }

    case "DELETE": {
      const id = action.payload;
      const newBudget = budget.filter((item) => {
        if (item.id !== id) {
          return item;
        }
      });

      return newBudget;
    }

    default:
      return budget;
  }
};
