import StudentSerializer from './StudentSerializer.js'

class ClassSectionSerializer {
  static getSummary(classSection) {
    const allowedAttributes = ['id', 'name']
    const serializedClassSection = {}

    for (const attribute of allowedAttributes) {
      serializedClassSection[attribute] = classSection[attribute]
    }

    return serializedClassSection
  } 

  static async getDetails(classSection) {
    const serializedClassSection = this.getSummary(classSection)
    serializedClassSection.students = await classSection.$relatedQuery('students')
      .where('isActive', true)
      .orderBy('firstName')
    
    serializedClassSection.students = serializedClassSection.students.map(student => {
      return StudentSerializer.getSummary(student)
    })

    return serializedClassSection
  }

  static async getArrangementDetails(classSection) {
    const serializedClassSection = this.getSummary(classSection)
    serializedClassSection.arrangements = await classSection.$relatedQuery('arrangements')
      .orderBy('createdAt')

    return serializedClassSection
  }
}

export default ClassSectionSerializer