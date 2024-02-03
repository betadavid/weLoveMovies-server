const knex = require("../db/connection");

function read(reviewId){
    return knex("reviews as r")
           .select("*")
           .where("review_id", reviewId)
           .first();
}

function readCritic(criticId){
    return knex("critics")
           .select("*")
           .where("critic_id", criticId)
           .first();
}

function update(updatedReview){
    return knex("reviews")
           .select("*")
           .where({review_id: updatedReview.review_id})
           .update(updatedReview, ["*"])
           .then(response => response[0]);
}

function listByMovieId(movieId){
    return knex("reviews as r")
           .join("critics as c", "r.critic_id", "c.critic_id")
           .select("*")
           .where("movie_id", movieId);
}

function destroy(reviewId){
    return knex("reviews")
           .where("review_id", reviewId)
           .del();
}

module.exports = {
    read,
    update,
    readCritic,
    listByMovieId,
    delete: destroy
};