const getEvenGroups = require('./getEventGroups.js')
const shuffleAndOrderStudents = require('./shuffleAndOrderStudents')

class Grouping {
  static random (students, size) {
    const shuffledStudents = _.shuffle(students)
    return getEvenGroups(size, shuffledStudents)
  }

  static similar (students, size, ratingType) {
    const shuffledStudents = _.shuffle(students)
    const orderedStudents = shuffledStudents.sort((studentA, studentB) => {
      return studentA[ratingType] - studentB[ratingType]
    })
    return getEvenGroups(size, orderedStudents)
  }

  static varied (students, size, ratingType) {
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

  static generate (students, arrangement) {
    const typeValues = arrangement.type.split(' ')
    const method = typeValues[0]

    if (method === 'random') {
      return this.random(students, arrangement.groupSize)
    } else {
      const ratingType = typeValues[1]
      if (method === 'similar') {
        return this.similar(students, arrangement.groupSize, ratingType)
      } else {
        return this.varied(students, arrangement.groupSize, ratingType)
      }
    }
  }
}

export default Grouping