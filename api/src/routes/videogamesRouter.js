const { Router } = require("express");
const {
  createVideogameHandler,
  getVideogameHandler,
  getVideogamesHandler,
} = require("../handlers/videogamesHandlers");

const videogamesRouter = Router();

const validate = (req, res, next) => {
  const { name, description, platform, image, release, rating } = req.body;
  if (!name) return res.status(400).json({ error: "Missing name" });
  if (!description) return res.status(400).json({ error: "Missing description" });
  if (!platform) return res.status(400).json({ error: "Missing platform" });
  if (!image) return res.status(400).json({ error: "Missing image" });
  if (!release) return res.status(400).json({ error: "Missing release" });
  if (!rating) return res.status(400).json({ error: "Missing rating" });

  next();
};

videogamesRouter.get("/", getVideogamesHandler);

videogamesRouter.get("/:id", getVideogameHandler);

videogamesRouter.post("/", validate, createVideogameHandler);

module.exports = videogamesRouter;