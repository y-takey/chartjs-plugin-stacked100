import React from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import ExampleChart from "./ExampleChart";

const root = createRoot(document.getElementById("root")!);
root.render(
  <React.StrictMode>
    <ExampleChart />
  </React.StrictMode>,
);
