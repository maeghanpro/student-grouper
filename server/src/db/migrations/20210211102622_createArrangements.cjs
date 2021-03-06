/**
 * @typedef {import("knex")} Knex
 */

/**
 * @param {Knex} knex
 */
exports.up = async (knex) =>
  knex.schema.createTable("arrangements", (table) => {
    table.bigIncrements("id");
    table.string("name").notNullable();
    table.string("type").notNullable();
    table.integer("groupSize").notNullable().unsigned();
    table.string("notes", 2000);
    table
      .bigInteger("classSectionId")
      .notNullable()
      .unsigned()
      .index()
      .references("classSections.id");
    table.timestamp("createdAt").notNullable().defaultTo(knex.fn.now());
    table.timestamp("updatedAt").notNullable().defaultTo(knex.fn.now());
  });

/**
 * @param {Knex} knex
 */
exports.down = (knex) => knex.schema.dropTableIfExists("arrangements");
