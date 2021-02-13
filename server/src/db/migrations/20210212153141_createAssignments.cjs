/**
 * @typedef {import("knex")} Knex
 */

/**
 * @param {Knex} knex
 */
exports.up = async (knex) => {
  return knex.schema.createTable('assignments', table => {
    table.bigIncrements('id')
    table.bigInteger('studentId').notNullable().unsigned().index().references('students.id')
    table.bigInteger('groupId').notNullable().unsigned().index().references('groups.id')
    table.timestamp("createdAt").notNullable().defaultTo(knex.fn.now())
    table.timestamp("updatedAt").notNullable().defaultTo(knex.fn.now())
  })
}

/**
 * @param {Knex} knex
 */
exports.down = (knex) => {
  return knex.schema.dropTableIfExists('assignments')
}
