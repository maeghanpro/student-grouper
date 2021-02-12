const Model = require('./Model.js')
const _ = require('lodash')

class Arrangement extends Model {
  static get tableName() {
    return 'arrangements'
  }

  static get jsonSchema() {
    return {
      type: 'object', 
      required: ['name', 'type', 'groupSize'],
      properties: {
        name: {
          type: 'string',
          minLength: 1,
          maxLength: 20
        },
        type: {
          type: 'string'
        },
        groupSize: {
          type: ['integer', 'string'],
          minimum: 2
        }
      }
    }
  }

  static get relationMappings() {
    const { ClassSection } = require('./index.js')

    return {
      classSection: {
        relation: Model.BelongsToOneRelation,
        modelClass: ClassSection,
        join: {
          from: 'arrangements.classSectionId',
          to: 'classSections.id'
        }
      }
    }
  }
}

module.exports = Arrangement