import { categoryInputs } from "./../types";
import { v4 as uuidv4 } from "uuid";
import { create } from "zustand";
import { Category } from "../types";
import { persist } from "zustand/middleware";

interface categoryState {
  categories: Category[];
  addNewCategory: (inputs: categoryInputs) => void;
  deleteCategory: (id: string) => void;
}

export const useCategoryStore = create<categoryState>()(
  persist(
    (set, get) => {
      return {
        categories: [
          {
            id: "1",
            name: "Transporte",
            type: "egreso",
          },
          {
            id: "2",
            name: "Medicina",
            type: "egreso",
          },
          {
            id: "3",
            name: "Alimentación",
            type: "egreso",
          },
          {
            id: "4",
            name: "Salario",
            type: "ingreso",
          },
          {
            id: "5",
            name: "Deuda",
            type: "egreso",
          },
          {
            id: "6",
            name: "Servicio",
            type: "egreso",
          },
          {
            id: "7",
            name: "Prestamo",
            type: "ingreso",
          },
          {
            id: "8",
            name: "Otros",
            type: "ingreso",
          },
        ],
        addNewCategory: (inputs: categoryInputs) => {
          const { categories } = get();
          const newCategories = [{ id: uuidv4(), ...inputs }, ...categories];
          set({ categories: newCategories });
        },
        deleteCategory: (id: string) => {
          const { categories } = get();
          const newCategories = categories.filter((item) => {
            if (item.id !== id) {
              return item;
            }
          });
          set({ categories: newCategories });
        },
      };
    },
    {
      name: "categories",
    }
  )
);
