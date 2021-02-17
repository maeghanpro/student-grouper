import getGroupSizeOptions from '../services/getGroupSizeOptions.js'
import StudentSerializer from './StudentSerializer.js'
import ArrangementSerializer from './ArrangementSerializer.js'

class ClassSectionSerializer {
  static getSummary(classSection) {
    const allowedAttributes = ['id', 'name', 'color']
    const serializedClassSection = {}

    for (const attribute of allowedAttributes) {
      serializedClassSection[attribute] = classSection[attribute]
    }

    return serializedClassSection
  } 

  static async getStudentDetails(classSection) {
    const serializedClassSection = this.getSummary(classSection)
    serializedClassSection.students = await classSection.$relatedQuery('students')
      .orderBy('firstName')
    
    serializedClassSection.students = serializedClassSection.students.map(student => {
      return StudentSerializer.getSummary(student)
    })

    return serializedClassSection
  }

  static async getDetails(classSection) {
    const serializedClassSection = await this.getStudentDetails(classSection)
    serializedClassSection.arrangements = await classSection.$relatedQuery('arrangements')
      .orderBy('createdAt', 'desc')
    
    serializedClassSection.arrangements = await Promise.all(serializedClassSection.arrangements.map(arrangement => {
      return ArrangementSerializer.getDetails(arrangement)
    }))
    
    serializedClassSection.groupSizeOptions = getGroupSizeOptions(serializedClassSection.students.length)

    return serializedClassSection
  }
}

export default ClassSectionSerializer