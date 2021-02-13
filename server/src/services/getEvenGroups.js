import _ from 'lodash'

const getEvenGroups = (size, students) => {
  const groups = _.chunk(students, size);
  const remainder = students.length % size;
  const lastGroup = groups[groups.length - 1]

  if (size === 2 && remainder === 1) {
    const evenGroups = groups.slice(0, groups.length - 2)
    const lastEvenGroup = groups[groups.length - 2]

    lastEvenGroup.push(lastGroup.pop())
    evenGroups.push(lastEvenGroup)

    return evenGroups

  } else if(remainder < size - 1 && remainder > 0) {
    const redistributionIndex = groups.length - (size - remainder);
    const evenGroups = groups.slice(0, redistributionIndex);
    const redistributionGroups = groups.slice(redistributionIndex, groups.length - 1)

    for(let i = 0; i < redistributionGroups.length; i ++) {
      lastGroup.push(redistributionGroups[i].pop())
      evenGroups.push(redistributionGroups[i])
    }
    evenGroups.push(lastGroup)

    return evenGroups

  } else {
    return groups
  }
}

export default getEvenGroups