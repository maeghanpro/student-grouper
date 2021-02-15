import { User, ClassSection } from '../../models/index.js'

class ClassSectionSeeder {
  static async seed() {
    const userOne = await User.query().findOne({email: 'test@test.com'})
    const userTwo = await User.query().findOne({email: 'testTwo@test.com'})

    const classSectionData = [
      {
        name: '7A',
        color: '#93995F',
        userId: userOne.id
      },
      {
        name: '7B',
        color: '#315E78',
        userId: userOne.id
      },
      {
        name: '7C',
        color: '#2E3F5A',
        userId: userOne.id
      },
      {
        name: '7D',
        color: '#7B717C',
        userId: userOne.id
      },
      {
        name: '6A',
        color: '#795061',
        userId: userTwo.id
      },
      {
        name: '6B',
        color: '#E48B6B',
        userId: userTwo.id
      },
      {
        name: '6C',
        color: '#2E3F5A',
        userId: userTwo.id
      }
    ]

    for (const classSection of classSectionData) {
      const currentClassSection = await ClassSection.query().findOne(classSection)

      if(!currentClassSection) {
        await ClassSection.query().insert(classSection)
      }
    }
  }
}

export default ClassSectionSeeder