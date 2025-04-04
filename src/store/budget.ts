import { create } from "zustand";
import { Budget, budgetInputs } from "../types";
import { v4 as uuidv4 } from "uuid";
import { persist } from "zustand/middleware";

interface budgetState {
  budget: Budget[];
  addNewBudget: (inputs: budgetInputs) => void;
  deleteBudget: (id: string) => void;
  updateBudget: (id: string, inputs: budgetInputs) => void;
}

export const useBudgetStore = create<budgetState>()(
  persist(
    (set, get) => {
      return {
        budget: [],
        addNewBudget: (inputs: budgetInputs) => {
          const { budget } = get();
          const newBudgets = [
            {
              id: uuidv4(),
              ...inputs,
            },
            ...budget,
          ];
          set({ budget: newBudgets });
        },
        deleteBudget: (id: string) => {
          const { budget } = get();
          const newBudget = budget.filter((b) => {
            if (b.id !== id) {
              return b;
            }
          });
          set({ budget: newBudget });
        },
        updateBudget: (id: string, inputs: budgetInputs) => {
          const { budget } = get();
          const updateBudget = budget.map((b) => {
            if (b.id === id) {
              return {
                ...b,
                ...inputs,
              };
            }
            return b;
          });
          set({ budget: updateBudget });
        },
      };
    },
    {
      name: "budgets",
    }
  )
);
