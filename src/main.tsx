import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { TransactionContextProvider } from "./context/TransactionContext.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <TransactionContextProvider>
      <App />
    </TransactionContextProvider>
  </StrictMode>
);
