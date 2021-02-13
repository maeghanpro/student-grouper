import _ from 'lodash'

const shuffleAndOrderStudents = (students, ratingType) => {
  const tierThree = _.shuffle(
    students.filter(student => student[ratingType] === 3)
  )
  const tierTwo = _.shuffle(
    students.filter(student => student[ratingType] === 2)
  )
  const tierOne = _.shuffle(
    students.filter(student => student[ratingType] === 1)
  )
  return [...tierThree, ...tierOne, ...tierTwo]
}

export default shuffleAndOrderStudents