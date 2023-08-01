const { Router } = require("express");
const genresRouter = Router();
const {createGenresHandler} = require("../handlers/genresRouter");

genresRouter.get("/", (req, res) => {
    res.send("Estoy en posts");
});

genresRouter.post("/", createGenresHandler);

module.exports = genresRouter;