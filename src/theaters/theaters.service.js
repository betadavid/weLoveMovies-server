const knex = require("../db/connection");

function list(){
    return knex("theaters as t")
           .join("movies_theaters as mt", "t.theater_id", "mt.theater_id")
           .join("movies as m", "mt.movie_id", "m.movie_id")
           .select("t.*","mt.is_showing", "m.*");
}

function listFilteredByMovie(movieId){
    return knex("theaters as t")
           .join("movies_theaters as mt", "t.theater_id", "mt.theater_id")
           .join("movies as m", "mt.movie_id", "m.movie_id")
           .select("t.*","mt.is_showing", "m.movie_id")
           .where("mt.movie_id", movieId);
}

module.exports = {
    list,
    listFilteredByMovie
};