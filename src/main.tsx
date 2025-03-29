import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "@/index.css";
import App from "@/App.tsx";
import ParticleEffect from "@/components/Canvas.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ParticleEffect />
    <App />
  </StrictMode>
);
