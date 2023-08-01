require("dotenv").config();
const axios = require("axios");
const { API_KEY } = process.env;
const { Videogame, Genres } = require("../db.js");

let getAllVideogames = async () => {
  let dataApiFormat = [];
  for (let i = 1; i < 6; i++) {
    let dataApi = await axios(
      "https://api.rawg.io/api/games?key=" + API_KEY + "&&page=" + i
    );
    dataApi.data.results.forEach((elemento) => {
      dataApiFormat.push({
        id: elemento.id,
        name: elemento.name,
        img: elemento.background_image,
        plataforms: elemento.platforms.map((plt) => plt.platform.name),
        released: elemento.released,
        rating: elemento.rating,
        genres: elemento.genres.map((gen) => gen.name),
      });
    });
  }

  const dataBd = await Videogame.findAll({ include: Genres });
  let data = {};

  if (dataBd) {
    let plt = [];
    plt.push(dataBd[0].plataforms);
    let gnrs = [];
    dataBd[0].Genres.forEach((elemento) => {
      if (!gnrs.includes(elemento.name)) {
        gnrs.push(elemento.name);
      }
    });

    data = { ...dataBd[0], plataforms: plt, Genres: gnrs };
  }
  console.log(data);
  return data;
};

let searchById = async (id) => {
  let dataApi = await getAllVideogames({ include: Genres });
  let result = dataApi.filter((ele) => ele.id == id);
  const findBd = await Videogame.findByPk(id);

  if (result.length > 0) {
    return result;
  } else if (findBd) {
    return findBd;
  } else throw new Error("no se encontro el videogame");
};

let searchByName = async (name) => {
  let dataApi = await getAllVideogames();
  let result = dataApi.filter((ele) => ele.name == name);
  const findBd = await Videogame.findOne({ where: { name: name } });
  console.log(typeof findBd);

  if (result || findBd[0] != null) {
    return result.concat(findBd);
  } else return "sin datos encontrados";
};

let postVideogame = async (
  nombre,
  descripcion,
  plataformas,
  img,
  fecha,
  rating,
  generos
) => {
  if (
    nombre &&
    descripcion &&
    plataformas &&
    img &&
    fecha &&
    rating &&
    generos
  ) {
    try {
      let nuevoVideogame = await Videogame.create({
        name: nombre,
        description: descripcion,
        plataforms: plataformas,
        image: img,
        date: fecha,
        rating: rating,
      });

      generos.forEach(async (genero) => {
        let finder = await Genres.findOne({ where: { name: genero } });
        nuevoVideogame.addGenres(finder);
      });
      return {
        name: nombre,
        description: descripcion,
        plataforms: plataformas,
        image: img,
        date: fecha,
        rating: rating,
      };
    } catch (error) {
      throw new Error(error);
    }
  } else throw new Error("datos incompletos");
};
module.exports = { getAllVideogames, searchById, searchByName, postVideogame };
