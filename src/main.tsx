import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { MonthTransactionProvider } from "./context/MonthContext.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <MonthTransactionProvider>
      <App />
    </MonthTransactionProvider>
  </StrictMode>
);
