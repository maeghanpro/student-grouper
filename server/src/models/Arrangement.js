const Model = require('./Model.js')
const _ = require('lodash')

const getEvenGroups = require('./services/getEventGroups.js')
const shuffleAndOrderStudents = require('./services/shuffleAndOrderStudents')

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

  generateRandomGroups (students) {
    const shuffledStudents = _.shuffle(students)
    return getEvenGroups(this.groupSize, shuffledStudents)
  }

  generateSimilarGroups (students) {
    const ratingType = this.type.split(' ')[1]
    const shuffledStudents = _.shuffle(students)
    const orderedStudents = shuffledStudents.sort((studentA, studentB) => {
      return studentA[ratingType] - studentB[ratingType]
    })
    return getEvenGroups(this.groupSize, orderedStudents)
  }

  generateVariedGroups (students) {
    const ratingType = this.type.split(' ')[1]
    const orderedStudents = shuffleAndOrderStudents(students, ratingType)
    const numberOfGroups = Math.ceil(students.length / this.groupSize)
    const groups = []
  
    for (let i = 0; i < numberOfGroups; i++) {
      groups.push([])
    }
  
    for (let i = 0; i < orderedStudents.length;) {
      for (let j = 0; j < groups.length; j++) {
        if (orderedStudents[i]) {
          groups[j].push(orderedStudents[i])
          i++
        } else {
          break;
        }
      }
    }
    return groups
  }
}

module.exports = Arrangement