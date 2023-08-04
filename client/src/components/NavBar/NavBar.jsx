//import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import SearchBar from "../SearchBar/SearchBar";
import styles from "./NavBar.module.css";

export default function NavBar() {
  return (
    <header className={styles.headerContainer}>
      <p className={styles.headerLogo}>La mejor app de juegos</p>
      <SearchBar />
      <Link to="/videogames">
        <button className={styles.headerCreate}>Crear Juego</button>
      </Link>
    </header>
  );
}
