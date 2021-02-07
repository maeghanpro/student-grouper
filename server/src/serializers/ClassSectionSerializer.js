class ClassSectionSerializer {
  static getSummary(classSection) {
    const allowedAttributes = ['id', 'name']
    const serializedClassSection = {}

    for (const attribute of allowedAttributes) {
      serializedClassSection[attribute] = classSection[attribute]
    }

    return serializedClassSection
  } 
}

export default ClassSectionSerializer