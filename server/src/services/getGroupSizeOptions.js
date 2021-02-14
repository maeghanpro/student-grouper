const getGroupSizeOptions = (numStudents) => {
  const maxSize = Math.floor(numStudents / 2)
  const groupSizeOptions = []

  for (let i = 2; i <= maxSize; i++) {
    groupSizeOptions.push(i)
  }
  if (numStudents === 2 || numStudents === 3) {
    groupSizeOptions.push(2)
  }
  return groupSizeOptions
}

export default getGroupSizeOptions