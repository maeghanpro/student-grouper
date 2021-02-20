import shuffle from 'lodash.shuffle'
import chunk from 'lodash.chunk'

class Grouping {
  static random (students, size) {
    const shuffledStudents = shuffle(students)
    return this.getEvenGroups(size, shuffledStudents)
  }

  static similar (students, size, ratingType) {
    const shuffledStudents = shuffle(students)
    const orderedStudents = shuffledStudents.sort((studentA, studentB) => {
      return studentA[ratingType] - studentB[ratingType]
    })

    return this.getEvenGroups(size, orderedStudents)
  }

  static varied (students, size, ratingType) {
    const orderedStudents = this.shuffleAndOrderStudents(students, ratingType)
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

  static getEvenGroups (size, students) {
    const groups = chunk(students, size);
    const remainder = students.length % size;
    const lastGroup = groups[groups.length - 1]
  
    if (size === 2 && remainder === 1) {
      const evenGroups = groups.slice(0, groups.length - 2)
      const lastEvenGroup = groups[groups.length - 2]
  
      lastEvenGroup.push(lastGroup.pop())
      evenGroups.push(lastEvenGroup)
  
      return evenGroups
  
    } else if(remainder < size - 1 && remainder > 0) {
      const redistributionIndex = groups.length - (size - remainder);
      const evenGroups = groups.slice(0, redistributionIndex);
      const redistributionGroups = groups.slice(redistributionIndex, groups.length - 1)
  
      for(let i = 0; i < redistributionGroups.length; i ++) {
        lastGroup.push(redistributionGroups[i].pop())
        evenGroups.push(redistributionGroups[i])
      }
      evenGroups.push(lastGroup)
  
      return evenGroups
  
    } else {
      return groups
    }
  }
  
  /**
   * Returns an array of shuffled Student objects grouped together by their tiers
   * and used in the varied groups sort function.
   * The order of students matters for the sorting function to be most effective.
   * High support students (tierThree) are listed first, followed by no support (tierOne) 
   * and last low support (tierTwo) because this is the order in which they will be sorted into groups
   * 
   * @param {Student[]} students array of instances of the Student Class
   * @param {string} ratingType 'academicTier' or 'socialEmotionalTier'
   */
  static shuffleAndOrderStudents (students, ratingType) {
    const tierThree = shuffle(
      students.filter(student => student[ratingType] === 3)
    )
    const tierTwo = shuffle(
      students.filter(student => student[ratingType] === 2)
    )
    const tierOne = shuffle(
      students.filter(student => student[ratingType] === 1)
    )
    return [...tierThree, ...tierOne, ...tierTwo]
  }
}

export default Grouping