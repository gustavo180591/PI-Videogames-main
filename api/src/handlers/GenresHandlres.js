const getAllGenres=require("../controllers/GenresControllers.js")

let getAllGenresHandler=async(req,res)=>{

try{
let genresAll=await getAllGenres();
res.status(200).json(genresAll)
}
catch(error){res.status(500).json(error)}



}


module.exports=getAllGenresHandler