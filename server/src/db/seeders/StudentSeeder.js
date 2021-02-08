import { ClassSection, User, Student } from '../../models/index.js'
import studentData from './studentsSeederData.js'

class StudentSeeder {
  static async seed() {
    const userOne = await User.query().findOne({email: 'test@test.com'})
    const userTwo = await User.query().findOne({email: 'testTwo@test.com'})
    const classSection7A = await ClassSection.query().findOne({name: '7A', userId: userOne.id})
    const classSection6A = await ClassSection.query().findOne({name: '6A', userId: userTwo.id})

    const students7A = studentData.students7A.map(student => {
      return { 
        ...student, 
        classSectionId: classSection7A.id 
      }
    })

    const students6A = studentData.students6A.map(student => {
      return { 
        ...student,
        classSectionId: classSection6A.id
      }
    })

    for (const student of students7A) {
      const currentStudent = await Student.query().findOne(student)

      if(!currentStudent) {
        await Student.query().insert(student)
      }
    }

    for (const student of students6A) {
      const currentStudent = await Student.query().findOne(student)

      if(!currentStudent) {
        await Student.query().insert(student)
      }
    }
  }
}

export default StudentSeeder