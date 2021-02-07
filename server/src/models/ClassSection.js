const { BelongsToOneRelation } = require('./Model.js')
const Model = require('./Model.js')

class ClassSection extends Model {
  static get tableName() {
    return 'classSections'
  }

  static get jsonSchema() {
    return {
      type: 'object',
      required: ['name'],
      properties: {
        name: {type: 'string'}
      }
    }
  }

  static get relationMappings() {
    const { User } = require('./index.js')

    return {
      user: {
        relation: Model.BelongsToOneRelation,
        modelClass: User,
        join: {
          from: 'classSections.userId',
          to: 'users.id'
        }
      }
    }
  }
}

module.exports = ClassSection