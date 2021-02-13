const Model = require('./Model.js')

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
    const { ClassSection, Group } = require('./index.js')

    return {
      classSection: {
        relation: Model.BelongsToOneRelation,
        modelClass: ClassSection,
        join: {
          from: 'arrangements.classSectionId',
          to: 'classSections.id'
        }
      },
      groups: {
        relation: Model.HasManyRelation,
        modelClass: Group,
        join: {
          from: 'arrangements.id',
          to: 'groups.arrangementId'
        }
      }
    }
  }
}

module.exports = Arrangement