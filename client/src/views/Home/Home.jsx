import styled from "styled-components";
import fondoHome from "../../img/fondoHome.jpg";
import NavBar from "../../components/NavBar/NavBar.jsx";
import CardsContainer from "../../components/CardsContainer/CardsContainer";
import { NavLink } from "react-router-dom";
//import { useState, useEffect } from "react";
import { useSelector } from "react-redux";

const Fondo = styled.div`
  background-image: url(${fondoHome});

  background-attachment: fixed;
  background-size: cover;
`;

export default function Home() {
  let data = useSelector((state) => state.data);

  return (
    <Fondo style={{ height: data ? "100%" : "100vh" }}>
      <NavBar />
      <NavLink to="/Formulario">CREAR VIDEOJUEGO</NavLink>
      {data.length > 1 ? <CardsContainer data={data} /> : <div>cargando</div>}
    </Fondo>
  );
}
