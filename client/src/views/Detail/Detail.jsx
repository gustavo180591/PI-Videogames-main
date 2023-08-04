import styled from "styled-components";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { NavLink } from "react-router-dom";
import React from "react";

const DetailStyle = styled.div``;

export default function Detail() {
  let { id } = useParams();

  console.log(id);

  let [data, setData] = useState();
  useEffect(() => {
    axios(`http://localhost:3001/videogames/${id}`)
      .then((datos) => datos.data)
      .then((data) => setData(data[0]))
      .catch((error) => {
        console.log(error);
      });
    console.log(data);
  }, [data, id]);

  return (
    <DetailStyle>
      <NavLink to="/Home">BACK TO THE HOME</NavLink>
      {data ? (
        <div>
        <div> {`ID : ${data.id}`}</div>
        <div> {`Nombre : ${data.name}`}</div>
        <div> {`Plataformas : ${data.platforms}`}</div>
        <img src={data.img} style={{ height: "425px" }} alt={data.name} />
        <div> {`Descripción : ${data.description}`}</div>
        <div> {`Fecha de lanzamiento: ${data.released}`}</div>
        <div> {`Rating : ${data.rating}`}</div>
        <div> {`Géneros : ${data.genres.join(", ")}`}</div>
      </div>
      ) : (
        <div>cargando</div>
      )}
    </DetailStyle>
  );
}
