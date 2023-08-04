import React, { useState } from "react";
import Swal from "sweetalert2";
import { useDispatch, useSelector } from "react-redux";
import { getRecipesByName } from "../../redux/actions/index";
import { FiSearch } from "react-icons/fi";
import styles from "../SearchBar/SearchBar.module.css";

export default function SearchBar() {
  const dispatch = useDispatch();
  const allRecipes = useSelector((state) => state.recipes);
  const [search, setSearch] = useState("");

  const alertNoFound = () => {
    Swal.fire({
      title: `Debes introducir un juego`,
      text: "Por favor, intente ingresar un juego",
      icon: "info",
      confirmButtonText: "Ok",
    });
  };
  const alertNoFound2 = () => {
    Swal.fire({
      title: `No hay Juegos con la combinación de Caracteres ingresados:" ${search}"`,
      text: "Por favor, intente ingresar un Juego",
      icon: "info",
      confirmButtonText: "Ok",
    });
  };
  function handleSubmit(e) {
    const recipesFilter = allRecipes.filter((e) =>
      e.name.toLowerCase().includes(search.toLowerCase())
    );
    e.preventDefault(e);
    if (!search) alertNoFound();
    if (!recipesFilter.length) {
      alertNoFound2();
      setSearch("");
    } else {
      dispatch(getRecipesByName(search));
      setSearch("");
    }
  }
  function handleInputName(e) {
    return setSearch(e.target.value);
  }

  return (
    <div>
      <div className={styles.search}>
        <form
          onSubmit={(e) => {
            handleSubmit(e);
          }}
        >
          <h2>Busca tu juego</h2>
          <button> {<FiSearch />} </button>
          <input
            type="text"
            placeholder="buscando..."
            value={search}
            onChange={(e) => {
              handleInputName(e);
            }}
          ></input>
        </form>
      </div>
    </div>
  );
}
