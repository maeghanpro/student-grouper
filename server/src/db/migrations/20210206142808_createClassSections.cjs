/**
 * @typedef {import("knex")} Knex
 */

/**
 * @param {Knex} knex
 */
exports.up = async (knex) =>
  knex.schema.createTable("classSections", (table) => {
    table.bigIncrements("id");
    table.string("name").notNullable();
    table.string("color").notNullable();
    table.bigInteger("userId").notNullable().index().unsigned().references("users.id");
    table.timestamp("createdAt").notNullable().defaultTo(knex.fn.now());
    table.timestamp("updatedAt").notNullable().defaultTo(knex.fn.now());
  });

/**
 * @param {Knex} knex
 */
exports.down = (knex) => knex.schema.dropTableIfExists("classSections");
