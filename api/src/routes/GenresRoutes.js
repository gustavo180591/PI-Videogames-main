const { Router } = require('express');
const getAllGenresHandler=require('../handlers/GenresHandlres.js');


let genresRouter=Router();

genresRouter.get("/",getAllGenresHandler);


module.exports=genresRouter


