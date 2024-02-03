const knex = require("../db/connection");

function list(query) {
    if(query.is_showing) {
        const isShowing = query.is_showing==='true'? true:false;
        return knex("movies as m")
               .join("movies_theaters as mt", "m.movie_id", "mt.movie_id")
               .select("m.*")
               .where({is_showing: isShowing})
               .groupBy("m.movie_id");
    }
    return knex("movies").select("*");
}

function read(movieId){
    return knex("movies")
           .select("*")
           .where({movie_id: movieId}).first();
}

module.exports = {
    list,
    read
};