import GroupSerializer from './GroupSerializer.js'

class ArrangementSerializer {
  static formatValues(arrangement) {
    const serializedArrangement = { ...arrangement }
    serializedArrangement.createdAt = serializedArrangement.createdAt.toDateString()
    serializedArrangement.updatedAt = serializedArrangement.updatedAt.toDateString()

    if (serializedArrangement.type === 'similar academicTier') {
      serializedArrangement.type = 'Similar Academically'
    } else if (serializedArrangement.type === 'similar socialEmotionalTier') {
      serializedArrangement.type = 'Similar Socially'
    } else if (serializedArrangement.type === 'varied academicTier') {
      serializedArrangement.type = 'Varied Academically'
    } else if (serializedArrangement.type === 'varied socialEmotionalTier') {
      serializedArrangement.type = 'Varied Socially'
    } else {
      serializedArrangement.type = 'Random'
    }

    return serializedArrangement
  } 

  static async getDetails(arrangement) {
    const serializedArrangement = this.formatValues(arrangement)

    serializedArrangement.groups = await arrangement.$relatedQuery('groups').orderBy('name')
    serializedArrangement.groups = await Promise.all(serializedArrangement.groups.map(group => {
      return GroupSerializer.getDetails(group)
    }))
  
    return serializedArrangement
  }
}

export default ArrangementSerializer