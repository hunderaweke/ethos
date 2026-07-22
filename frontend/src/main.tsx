import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import "@fontsource/google-sans/index.css";
import "@fontsource/google-sans/500.css";
import "@fontsource/google-sans/700.css";
import "@fontsource/cormorant-garamond/index.css";
import "@fontsource/cormorant-garamond/400-italic.css";
import "@fontsource/cormorant-garamond/700.css";
import "@fontsource/cormorant-garamond/700-italic.css";
import "@fontsource/lora/index.css";
import "@fontsource/lora/400-italic.css";
import "@fontsource/lora/700.css";
import "@fontsource/lora/700-italic.css";
import "./index.css";
import App from "./App.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>,
);
