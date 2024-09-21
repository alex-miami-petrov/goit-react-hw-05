import React, { useState, useEffect, useRef } from "react";
import "./App.css";
import { NavLink } from "./components/Navigation";
import { lazy } from "react";

const HomePage = lazy(() => import("./pages/HomePage"));
const MovieDetailsPage = lazy(() => import("./pages/MovieDetailsPage"));
const MoviesPage = lazy(() => import("./pages/MoviesPage"));
const NotFoundPage = lazy(() => import("./pages/NotFoundPage"));

const App = () => {
  return <div></div>;
};

export default App;
