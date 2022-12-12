import React from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import * as dotenv from "dotenv";
import "./app.css";
import { Home } from "./pages/Home";
import { Favourites } from "./pages/Favourites";

dotenv.config();

const app = document.getElementById("app");

if (app) {
  createRoot(app).render(
    <React.StrictMode>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/favourites" element={<Favourites />} />
        </Routes>
      </BrowserRouter>
    </React.StrictMode>
  );
}
