const {Genre} = require("../db");
const axios = require("axios");
const {API_KEY} =  process.env;

const newGenre = await Genre.create({ title, body });
  //sequelize crea una serie de metodos en base a los nombres de los modelos que estoy relacionando sabe que el post necesita un user.
  // Te da un metodo que puedas setear el usuario en cuestion nos está diciendo que usuario es el que esta haciendo el post.
  // Es solo este usuario y ninguno más.
  await newGenre.setUser(userId);
  return newGenre;

  const getAllGenres = async () => {
    // Buscar en bdd
    const databaseGenres = await Genres.findAll();
    // Buscar en api
    const apiGenresRaw = (
      await axios.get("https://api.rawg.io/api/games")
    ).data;
  
    const apiGenres = cleanArray(apiGenresRaw);
    // Unificar
    return [...databaseGenres, ...apiGenres];
  };

  module.exports = { getAllGenres };