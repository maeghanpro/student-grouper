import { User, ClassSection } from '../../models/index.js'

class ClassSectionSeeder {
  static async seed() {
    const userOne = await User.query().findOne({email: 'test@test.com'})
    const userTwo = await User.query().findOne({email: 'testTwo@test.com'})

    const classSectionData = [
      {
        name: '7A',
        userId: userOne.id
      },
      {
        name: '7B',
        userId: userOne.id
      },
      {
        name: '7C',
        userId: userOne.id
      },
      {
        name: '7D',
        userId: userOne.id
      },
      {
        name: '6A',
        userId: userTwo.id
      },
      {
        name: '6B',
        userId: userTwo.id
      },
      {
        name: '6C',
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