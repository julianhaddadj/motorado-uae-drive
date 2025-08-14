import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { LayoutProvider } from "@/hooks/use-layout";

createRoot(document.getElementById("root")!).render(
  <LayoutProvider>
    <App />
  </LayoutProvider>
);
