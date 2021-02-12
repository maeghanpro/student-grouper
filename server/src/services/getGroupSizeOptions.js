const getGroupSizeOptions = (numStudents) => {
  const maxSize = Math.floor(numStudents / 2)
  const groupSizeOptions = []

  for (let i = 2; i <= maxSize; i++) {
    groupSizeOptions.push(i)
  }

  return groupSizeOptions
}

export default getGroupSizeOptions