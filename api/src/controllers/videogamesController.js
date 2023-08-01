const { Videogame, Genre } = require("../db");
require('dotenv').config();
const axios = require("axios");
const URL = 'https://api.rawg.io/api/games/';
const {API_KEY} =  process.env;

//Con esta función traemos las propiedades de la api que nos interesan.
const cleanArray = (arr) =>
  arr.map((elem) => {
    return {
      id: elem.id,
      name: elem.name,
      description: elem.description,
      platform: elem.platform,
      image: elem.image,
      release: elem.release,
      rating: elem.rating,
      created: false,
    };
  });

const createVideogame = async (name, description, platform, image, release, rating) => {
  
  await Videogame.create({ name, description, platform, image, release, rating });
};

// con await estamos diciendo espero que esa promesa se resuelva
//User.create({ name, email, phone }) devuelve una promesa
//Tenemos que darle función async porque nos da la ejecucion de una funcion async nos da una promesa. Esta basado en promesas.
const getVideogamesById = async (id, source) => {
  const videogame =
    source === "api"
      ? (await axios.get(`${URL}${id}?key=${API_KEY}`))
          .data
      : await Videogame.findByPk(id, {
          include: {
            model: Genre,
            attributes: ['name'],
            through: { attributes: [],},
          },
        });
  // {  include:{    model: Genre,  }}   ... (Con esta instrucción trae los posteo realizados por el usuario).
  return videogame;
};

const getAllVideogames = async () => {
  // Buscar en bdd
  const databaseVideogames = await Videogame.findAll();
  // Buscar en api
  const apiVideogamesRaw = (
    await axios.get("https://api.rawg.io/api/games")
  ).data;

  const apiVideogames = cleanArray(apiVideogamesRaw);
  // Unificar
  return [...databaseVideogames, ...apiVideogames];
};
const searchVideogameByName = async (name) => {
  const databaseVideogames = await Videogame.findAll({ where: { name: name } });
  const apiVideogamesRaw = (
    await axios.get("https://api.rawg.io/api/games?search={game}")
  ).data;
  const apiVideogames = cleanArray(apiVideogamesRaw);
  const filteredApi = apiVideogames.filter((videogame) => videogame.name === name);
  // es la array filteredApi, pero al colocar los ... estamos hablando de los elementos de filteredApi.
  return [...filteredApi, ...databaseVideogames];
};

module.exports = { createVideogame, getVideogamesById, getAllVideogames, searchVideogameByName };
