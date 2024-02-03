const asyncErrorBoundary = require("../errors/asyncErrorBoundary");
const service = require("./theaters.service");
const reduceProperties = require("../utils/reduce-properties");

const reduceMovies = reduceProperties("theater_id", {
    movie_id: ["movies", null, "movie_id"],
    title: ["movies", null, "title"],
    runtime_in_minutes: ["movies", null, "runtime_in_minutes"],
    rating: ["movies", null, "rating"],
    description: ["movies", null, "description"],
    image_url: ["movies", null, "image_url"],
    is_showing: ["movies", null, "is_showing"],
});


async function list(req, res, next){
    const { movieId } = req.params;
    
    if(movieId){
        const filteredTheaters = await service.listFilteredByMovie(movieId)
        res.json({data: filteredTheaters});
    }

    const response = await service.list();
    const data = reduceMovies(response);
    res.json({ data });
}

module.exports = {
    list: [asyncErrorBoundary(list)]
};