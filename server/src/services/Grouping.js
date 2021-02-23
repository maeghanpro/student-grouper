import shuffle from "lodash.shuffle";
import chunk from "lodash.chunk";

class Grouping {
  /**
   * Uses lodash shuffle method and getEvenGroups method
   * to create multidimensional array of groups with students in a random order
   *
   * @param {Student[]} students array of instances of the Student class
   * @param {integer} size specified by the user
   *
   * @returns {Array}
   */
  static random(students, size) {
    const shuffledStudents = shuffle(students);
    return this.getEvenGroups(shuffledStudents, size);
  }

  /**
   * Uses lodash shuffle method to put students in a random order,
   * sorts students by specified ratingType value,
   * then calls getEvenGroups to create the multidimensional array of groups
   *
   * @param {Student[]} students array of instances of the Student class
   * @param {integer} size specified by the user
   * @param {string} ratingType specified by the user
   *
   * @returns {Array}
   */
  static similar(students, size, ratingType) {
    const shuffledStudents = shuffle(students);
    const orderedStudents = shuffledStudents.sort(
      (studentA, studentB) => studentA[ratingType] - studentB[ratingType]
    );

    return this.getEvenGroups(orderedStudents, size);
  }

  /**
   * returns multidimensional array where students of each ratingType value
   * are evenly distributed across the groups
   * calls on the shuffleAndOrderStudents method to prep the array for sorting
   *
   * @param {Student[]} students array of instances of the Student class
   * @param {integer} size specified by the user
   * @param {string} ratingType specified by the user
   *
   * @returns {Array}
   */
  static varied(students, size, ratingType) {
    const orderedStudents = this.shuffleAndOrderStudents(students, ratingType);
    const numberOfGroups = Math.ceil(students.length / size);
    const groups = [];

    for (let i = 0; i < numberOfGroups; i++) {
      groups.push([]);
    }

    for (let i = 0; i < orderedStudents.length; ) {
      for (let j = 0; j < groups.length; j++) {
        if (orderedStudents[i]) {
          groups[j].push(orderedStudents[i]);
          i++;
        } else {
          break;
        }
      }
    }
    return groups;
  }

  /**
   * Calls the necessary sorting function based on the user specified
   * sorting method.
   *
   * @param {Student[]} students array of instances of the Student class
   * @param {Object} arrangement instance of the Arrangement class
   *
   * @returns {Array}
   */
  static generate(students, arrangement) {
    const typeValues = arrangement.type.split(" ");
    const method = typeValues[0];

    if (method === "random") {
      return this.random(students, arrangement.groupSize);
    }
    const ratingType = typeValues[1];
    if (method === "similar") {
      return this.similar(students, arrangement.groupSize, ratingType);
    }
    return this.varied(students, arrangement.groupSize, ratingType);
  }

  /**
   * Uses lodash chunk to create a multidimensional array for a given size.
   * - When the array of students is evenly divisible by the size or
   *   if the remainder is size - 1 then the array created by chunk is returned unmodified.
   * - For the other situations, the function will push more students into the last group
   *   by popping one from each previous group, until the last group has size - 1 students.
   * - When the number of groups is less than the size - remainder then the function will not
   *   return even groups. However, this scenario does not happen in practice because the user
   *   is disallowed from specifying a size that cannot generate even groups.
   * - A size of two for an odd number of students is handled uniquely so that the last group
   *   has 3 students rather than one.
   *
   * @param {Student[]} students array of instances of the Student class
   * @param {integer} size specified by the user
   *
   * @returns {Array}
   */
  static getEvenGroups(students, size) {
    const groups = chunk(students, size);
    const remainder = students.length % size;
    const lastGroup = groups[groups.length - 1];

    if (size === 2 && remainder === 1) {
      const evenGroups = groups.slice(0, groups.length - 2);
      const lastEvenGroup = groups[groups.length - 2];

      lastEvenGroup.push(lastGroup.pop());
      evenGroups.push(lastEvenGroup);

      return evenGroups;
    }
    if (remainder < size - 1 && remainder > 0) {
      const redistributionIndex = groups.length - (size - remainder);
      const evenGroups = groups.slice(0, redistributionIndex);
      const redistributionGroups = groups.slice(redistributionIndex, groups.length - 1);

      for (let i = 0; i < redistributionGroups.length; i++) {
        lastGroup.push(redistributionGroups[i].pop());
        evenGroups.push(redistributionGroups[i]);
      }
      evenGroups.push(lastGroup);

      return evenGroups;
    }
    return groups;
  }

  /**
   * Returns an array of shuffled Student objects grouped together by their tiers
   * and used in the varied groups sort function.
   * The order of students matters for the sorting function to be most effective.
   * High support students (tierThree) are listed first, followed by no support (tierOne)
   * and last low support (tierTwo) because this is the order in which they will be sorted into groups
   *
   * @param {Student[]} students array of instances of the Student Class
   * @param {string} ratingType 'academicTier' or 'socialEmotionalTier'
   *
   * @returns {Array}
   */
  static shuffleAndOrderStudents(students, ratingType) {
    const tierThree = shuffle(students.filter((student) => student[ratingType] === 3));
    const tierTwo = shuffle(students.filter((student) => student[ratingType] === 2));
    const tierOne = shuffle(students.filter((student) => student[ratingType] === 1));
    return [...tierThree, ...tierOne, ...tierTwo];
  }
}

export default Grouping;
