const getGroupSizeOptions = (numStudents) => {
  const maxSize = Math.floor(numStudents / 2)
  const groupSizeOptions = []

  for (let i = 2; i <= maxSize; i++) {
    const remainder = numStudents % i
    const quotient = numStudents / i

    if( remainder === 0 || i - remainder < quotient) {
      groupSizeOptions.push(i)
    }
  }
  if (numStudents === 2 || numStudents === 3) {
    groupSizeOptions.push(2)
    if (numStudents === 3) {
      getGroupSizeOptions.push(3)
    }
  }
  return groupSizeOptions
}

export default getGroupSizeOptions