import React from "react";
import { NavLink } from "react-router-dom";
import s from "./Navigation.module.css";

const Navigation = () => {
  return (
    <nav className={s.navList}>
      <NavLink to="/" className={s.navLink}>
        Home
      </NavLink>
      <NavLink to="/movies" className={s.navLink}>
        Movies
      </NavLink>
    </nav>
  );
};

export default Navigation;
