import { v4 as uuidv4 } from "uuid";
import { TransactionType } from "./reducer";

export interface categoryInputs {
  name: string;
  type: TransactionType;
}

export interface Category extends categoryInputs {
  id: string;
}

export const categoryInitialInputs: Category = {
  id: "",
  name: "",
  type: "",
};

export const defaultCategories: Category[] = [
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
];

export type ActionCategory =
  | {
      type: "ADD";
      payload: categoryInputs;
    }
  | {
      type: "DELETE";
      payload: string;
    };

export const reducerCategories = (
  categoryArray: Category[],
  action: ActionCategory
): Category[] => {
  switch (action.type) {
    case "ADD": {
      const newCategory = [
        { id: uuidv4(), ...action.payload },
        ...categoryArray,
      ];
      return newCategory;
    }

    case "DELETE": {
      const id = action.payload;
      const newCategory = categoryArray.filter((item) => {
        if (item.id !== id) {
          return item;
        }
      });

      return newCategory;
    }

    default:
      return categoryArray;
  }
};
