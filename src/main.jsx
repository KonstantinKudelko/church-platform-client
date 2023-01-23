import { App } from "./app";
import { createRoot } from "react-dom/client";
import "./assets/css/app.css";

const container = document.getElementById("root");
const root = createRoot(container);
root.render(<App />);
