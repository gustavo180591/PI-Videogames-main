import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import styled from "styled-components";
import { NavLink, useHistory } from "react-router-dom";
import axios from "axios";

const Marco = styled.div``;

const GenresDiv = styled.div`
  height: 250px;
  width: 450px;
  border: 2px solid black;
  display: flex;
  flex-wrap: wrap;
  margin: auto;
  overflow-y: auto;
`;

const GenresSelected = styled.div`
  display: inline;
  position: relative;
  padding: 0px 10px 0px 10px;
  height: 30px;
  margin: 10px;
  border: none;
  border-radius: 20px;
  background-color: #9dfef4;
`;

const Err = styled.label`
  color: red;
  visibility: hidden;
`;

const Send = styled.button``;

export default function Formulario() {
  const data = useSelector((state) => state.data);
  const genres = useSelector((state) => state.genres);
  const [genresSelected, setGenresSelected] = useState([]);
  const [verification, setVerification] = useState({
    nombre: false,
    descripcion: false,
    plataforma: false,
    img: false,
    date: false,
    clasificacion: false,
    genres: false,
  });
  const dispatch = useDispatch();
  const history = useHistory();
  const plataformas = [...new Set(data.flatMap((ele) => ele.plataforms))];

  useEffect(() => {
    console.log("cargando datos");
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:3001/videogames/");
        const data = response.data;
        dispatch({ type: "login", payload: data });
        alert("datos enviados");
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, [dispatch]);

  const envioDatos = async () => {
    try {
      const rpta = await axios.post("http://localhost:3001/videogames/", {
        nombre: document.getElementById("nombre").value,
        descripcion: document.getElementById("descripcion").value,
        plataformas: document.getElementById("plataforma").value,
        img: document.getElementById("img").value,
        fecha: document.getElementById("date").value,
        rating: document.getElementById("clasificacion").value,
        generos: genresSelected,
      });
      console.log(rpta);
    } catch (error) {
      console.log(error);
    }
  };

  const visible = (nombre, valor) => {
    document.getElementById(nombre + "Error").style.visibility = valor;
  };

  useEffect(() => {
    if (genresSelected.length === 0) {
      visible("genres", "visible");
      setVerification({ ...verification, genres: false });
    } else {
      visible("genres", "hidden");
      setVerification({ ...verification, genres: true });
    }
  }, [genresSelected, verification]);

  const addGenres = (e) => {
    const valor = e.target.value;
    if (!genresSelected.includes(valor)) {
      setGenresSelected([...genresSelected, valor]);
    }
  };

  const deleteGenre = (e) => {
    const newGenres = genresSelected.filter((ele) => ele !== e.target.id);
    setGenresSelected(newGenres);
    if (newGenres.length === 0) {
      setVerification({ ...verification, genres: false });
    }
  };

  const validate = (e) => {
    const elemento = e.target;
    if (elemento.value === "") {
      visible(elemento.id, "visible");
      setVerification({ ...verification, [elemento.id]: false });
    } else {
      visible(elemento.id, "hidden");
      setVerification({ ...verification, [elemento.id]: true });
    }
    switch (elemento.id) {
      case "img":
        const urlPattern = /^https?:\/\/(?:www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b(?:[-a-zA-Z0-9()@:%_\+.~#?&\/=]*)$/;
        if (!urlPattern.test(elemento.value)) {
          visible(elemento.id, "visible");
          setVerification({ ...verification, [elemento.id]: false });
        } else {
          visible(elemento.id, "hidden");
          setVerification({ ...verification, [elemento.id]: true });
        }
        break;
      case "clasificacion":
        if (elemento.value > 0 && elemento.value <= 5) {
          visible(elemento.id, "hidden");
          setVerification({ ...verification, [elemento.id]: true });
        } else {
          visible(elemento.id, "visible");
          setVerification({ ...verification, [elemento.id]: false });
        }
        break;
      default:
        break;
    }
  };

  const submit = async (e) => {
    e.preventDefault();
    const ready = Object.keys(verification);

    const readyForSend = () => {
      let indicador = 0;
      ready.forEach((value) => {
        if (verification[value] === false) {
          visible(value, "visible");
          indicador++;
        }
      });
      if (indicador > 0) {
        alert(
          `hay ${indicador} campos a revisar, verifique la información colocada`
        );
        return false;
      } else {
        return true;
      }
    };

    if (readyForSend()) {
      await envioDatos();
      history.push("/Home");
    }
  };

  return (
    <Marco>
      <NavLink to="/Home">BACK TO HOME</NavLink>

      <form onSubmit={submit}>
        {/* Resto del formulario aquí */}
      </form>
    </Marco>
  );
}
