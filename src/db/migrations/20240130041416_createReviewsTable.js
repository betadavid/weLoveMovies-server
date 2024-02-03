/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.createTable("reviews",(table)=> {
        table.increments("review_id").primary();
        table.text("content").notNullable();
        table.integer("score").notNullable();
        table.integer("critic_id").notNullable();
        table.foreign("critic_id")
             .references("critic_id")
             .inTable("critics")
             .onDelete("CASCADE");
        table.integer("movie_id").notNullable();
        table.foreign("movie_id")
             .references("movie_id")
             .inTable("movies")
             .onDelete("CASCADE");
        table.timestamps(true, true);
    });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema.dropTable("reviews");
};
