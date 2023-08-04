import React from "react";
import { Link } from "react-router-dom";
import styles from "../Landing/Landing.modules.css";

export default function LandingPage() {
  return (
    <div className={styles.landing}>
      <h1 className={styles.wlc}>The Best Games </h1>
      <Link to="/Home">
        <button className={styles.btn}>START</button>
      </Link>
    </div>
  );
}
