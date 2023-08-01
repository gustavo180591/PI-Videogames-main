const {
     getAllGenres,
  } = require("../controllers/genresController");
  
  const getVideogamesHandler = async (req, res) => {
    const { name } = req.query;
  
    const results = name ? await searchVideogameByName(name) : await getAllVideogames();
    res.status(200).json(results);
    /* if (name) res.send(`Llamar a la función que busca por nombre`);
    else res.send("Quiero enviar todos los usuarios"); */
    /* console.log(name);
      res.send(name); */
  };
  
  const getVideogameHandler = async (req, res) => {
    const { id } = req.params;
    const source = isNaN(id) ? "bdd" : "api";
    // Esto es un ternario isNaN(id) ? "bdd":"api;"
    /* if (isNaN(id)) {
      // Es de la base de datos
      console.log("Tendría que buscar en la base de datos BDD");
    } else {
      // Esto es de la api
      console.log(
        "Tendría que buscar en la Application Programming Interfaces API"
      );
    } */
    try {
      // Yo te cuento donde tenés que ir a buscar esto.
      const videogame = await getVideogamesById(id, source);
      res.status(200).json(videogame);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
    /* res.send(`Va a enviar el detalle del usuario de ID ${id}`); */
  };
  
  const createVideogameHandler = async (req, res) => {
    const { name, description, platform, image, release, rating } = req.body;
  
    try {
      const newVideogame = await createVideogame(name, description, platform, image, release, rating);
      res.status(201).json("Creado exitosamente");
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  };
  
  module.exports = {
    createVideogameHandler,
    getVideogamesHandler,
    getVideogameHandler,
  };