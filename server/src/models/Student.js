const Model = require('./Model')

class Student extends Model {
  static get tableName() {
    return 'students'
  }

  static get jsonSchema() {
    return {
      type: 'object',
      required: ['firstName', 'lastInitial', 'academicTier', 'socialEmotionalTier'],
      properties: {
        firstName: {
          type: 'string',
          minLength: 1,
          maxLength: 20,
        },
        lastInitial: {
          type: 'string',
          minLength: 1,
          maxLength: 4
        },
        academicTier: {
          type: ['integer', 'string'],
          minimum: 1,
          maximum: 3
        },
        socialEmotionalTier: {
          type: ['integer', 'string'],
          minimum: 1,
          maximum: 3
        }
      }
    }
  }

  static get relationMappings() {
    const { ClassSection } = require('./index')

    return {
      classSection: {
        relation: Model.BelongsToOneRelation,
        modelClass: ClassSection,
        join: {
          from: 'students.classSectionId',
          to: 'classSections.id'
        }
      }
    }
  }
}

module.exports = Student