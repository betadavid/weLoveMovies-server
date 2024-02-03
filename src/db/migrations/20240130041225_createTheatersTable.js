/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.createTable("theaters", (table) => {
        table.increments("theater_id").primary();
        table.string("name").notNullable();
        table.string("address_line_1").notNullable();
        table.string("address_line_2");
        table.string("city");
        table.string("state");
        table.string("zip");
        table.timestamps(true, true);
    });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema.dropTable("theaters");
};
