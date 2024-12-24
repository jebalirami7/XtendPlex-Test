import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { DraggingProvider } from "./hooks/useDragging.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <DraggingProvider>
      <App />
    </DraggingProvider>
  </StrictMode>
);
