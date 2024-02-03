const asyncErrorBoundary = require("../errors/asyncErrorBoundary");
const service = require("./movies.service");

async function list (req, res){
    const data = await service.list(req.query);
    res.json({ data });
}

async function movieExists(req, res, next){
    const { movieId } = req.params;
    const movie = await service.read(movieId);
    if(movie){
        res.locals.movie = movie;
        return next();
    }
    return next({status: 404, message: `Movie not found: ${movieId}`});
}

function read(req, res){
    const data = res.locals.movie;
    res.json({data});
}

module.exports = {
    list: [asyncErrorBoundary(list)],
    read: [asyncErrorBoundary(movieExists), asyncErrorBoundary(read)],
    movieExists
};