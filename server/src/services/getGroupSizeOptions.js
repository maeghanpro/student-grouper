/**
 * Creates a list of valid group sizes for the user to choose from.
 * A size is invalid if it cannot create at least one group of n and the rest n-1
 * or if it would result in only one group containing all students
 *
 * @param {integer} numStudents
 *
 * @returns {Array} array of integers
 */
const getGroupSizeOptions = (numStudents) => {
  const maxSize = Math.ceil(numStudents / 2);
  const groupSizeOptions = [];

  for (let i = 2; i <= maxSize; i++) {
    const remainder = numStudents % i;
    const quotient = numStudents / i;

    if (remainder === 0 || i - remainder < quotient) {
      groupSizeOptions.push(i);
    }
  }
  if (numStudents === 2) {
    groupSizeOptions.push(2);
  }
  return groupSizeOptions;
};

export default getGroupSizeOptions;
