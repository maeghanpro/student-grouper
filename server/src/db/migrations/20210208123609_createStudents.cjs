/**
 * @typedef {import("knex")} Knex
 */

/**
 * @param {Knex} knex
 */
exports.up = async (knex) => {
  return knex.schema.createTable('students', table => {
    table.bigIncrements('id')
    table.string('firstName').notNullable()
    table.string('lastInitial').notNullable()
    table.integer('academicTier').notNullable().unsigned()
    table.integer('socialEmotionalTier').notNullable().notNullable()
    table.bigInteger('classSectionId').notNullable().unsigned().index().references('classSections.id')
    table.timestamp("createdAt").notNullable().defaultTo(knex.fn.now())
    table.timestamp("updatedAt").notNullable().defaultTo(knex.fn.now())
  })
}

/**
 * @param {Knex} knex
 */
exports.down = (knex) => {
  return knex.schema.dropTableIfExists('students')
}
