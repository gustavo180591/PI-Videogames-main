import style from "./Landing.module.css";
import { Link } from "react-router-dom";
const LandingPage = () => {
  return (
    <div class={style.background}>
      <div class={style.title}>
        <h2>BIENVENIDOS AL PI DE VIDEOGAMES</h2>
        <Link to="/home">
          <button class={style.parpadea} type="submit">
            INICIO
          </button>
        </Link>
      </div>
    </div>
  );
};

export default LandingPage;
