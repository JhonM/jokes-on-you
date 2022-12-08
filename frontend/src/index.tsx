import React from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import * as dotenv from "dotenv";
import { App } from "./App";

dotenv.config();

const app = document.getElementById("app");

if (app) {
  createRoot(app).render(
    <React.StrictMode>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<App />} />
        </Routes>
      </BrowserRouter>
    </React.StrictMode>
  );
}
