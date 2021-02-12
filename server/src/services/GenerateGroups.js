const getEvenGroups = require('./getEventGroups.js')
const shuffleAndOrderStudents = require('./shuffleAndOrderStudents')

class GenerateGroups {
  static randomGroups (students, size) {
    const shuffledStudents = _.shuffle(students)
    return getEvenGroups(size, shuffledStudents)
  }

  static similarGroups (students, size, ratingType) {
    const shuffledStudents = _.shuffle(students)
    const orderedStudents = shuffledStudents.sort((studentA, studentB) => {
      return studentA[ratingType] - studentB[ratingType]
    })
    return getEvenGroups(size, orderedStudents)
  }

  variedGroups (students, size, ratingType) {
    const orderedStudents = shuffleAndOrderStudents(students, ratingType)
    const numberOfGroups = Math.ceil(students.length / size)
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

export default GenerateGroups