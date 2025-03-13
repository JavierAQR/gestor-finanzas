/* BUDGET */

// Formulario para agregar presupuestos
export interface budgetForm {
  category: string;
  budget: number;
}

// Payload del reducer
export interface budgetInputs extends budgetForm {
  date: string;
  type: TransactionType;
}

//Cada presupuesto debe llevar su id
export interface Budget extends budgetInputs {
  id: string;
}

/* CATEGORY */

// Para el formulario
export interface categoryInputs {
  name: string;
  type: TransactionType;
}

// Cada objeto debe llevar su id
export interface Category extends categoryInputs {
  id: string;
}

/* TRANSACTION */

//Tipos de transacciones, vacío solo para el input

export type TransactionType = "ingreso" | "egreso" | "";

//Para el formulario
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
