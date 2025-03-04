import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { TransactionContextProvider } from "./context/TransactionContext.tsx";
import { MonthTransactionProvider } from "./context/MonthContext.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <TransactionContextProvider>
      <MonthTransactionProvider>
        <App />
      </MonthTransactionProvider>
    </TransactionContextProvider>
  </StrictMode>
);
