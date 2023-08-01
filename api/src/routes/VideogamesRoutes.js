const { Router } = require("express");
const {
  getAllVideogamesHandler,
  searchByIdHandler,
  postVideogameHandler,
} = require("../handlers/VideogamesHandlers")

let VideogamesRouter = Router();

VideogamesRouter.get("/", getAllVideogamesHandler);
VideogamesRouter.get("/:id", searchByIdHandler);
VideogamesRouter.post("/", postVideogameHandler);

module.exports = VideogamesRouter;
