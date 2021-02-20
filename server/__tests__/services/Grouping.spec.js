import shuffle from 'lodash.shuffle';
import chunk from 'lodash.chunk';

import Grouping from '../../src/services/Grouping';
import getGroupSizeOptions from '../../src/services/getGroupSizeOptions';

jest.mock('lodash.shuffle');
jest.mock('lodash.chunk');

describe('src/services/Grouping.js', () => {
  beforeEach(() => {
    shuffle.mockImplementation((arr) => arr);
    chunk.mockImplementation(jest.requireActual('lodash.chunk'))
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  describe('shuffleAndOrderStudents',() => {
    it('returns array of shuffled students in the expected order', () => {
      const students = [
        { id: 1, rating: 3 },
        { id: 2, rating: 1 },
        { id: 3, rating: 3 },
        { id: 4, rating: 2 },
        { id: 5, rating: 2 },
        { id: 6, rating: 1 }
      ]

      expect(Grouping.shuffleAndOrderStudents(students, 'rating')).toEqual([
        { id: 1, rating: 3 },
        { id: 3, rating: 3 },
        { id: 2, rating: 1 },
        { id: 6, rating: 1 },
        { id: 4, rating: 2 },
        { id: 5, rating: 2 }
      ])
      expect(shuffle.mock.calls.length).toBe(3)
      expect(shuffle.mock.calls[0][0]).toEqual([{ id: 1, rating: 3 },
        { id: 3, rating: 3 }])
      expect(shuffle.mock.calls[1][0]).toEqual([{ id: 4, rating: 2 },
        { id: 5, rating: 2 }])
      expect(shuffle.mock.calls[2][0]).toEqual([{ id: 2, rating: 1 },
        { id: 6, rating: 1 }])
    });
  });

  describe('varied',() => {
    let students;
    beforeEach(() => {
      students = [
        { id: 1, rating: 3 },
        { id: 2, rating: 1 },
        { id: 3, rating: 3 },
        { id: 4, rating: 2 },
        { id: 5, rating: 2 },
        { id: 6, rating: 1 },
        { id: 7, rating: 1 },
        { id: 8, rating: 2 },
        { id: 9, rating: 2 },
        { id: 10, rating: 3 },
        { id: 11, rating: 1 },
        { id: 12, rating: 2 },
        { id: 13, rating: 1 },
        { id: 14, rating: 3 }
      ]
    })

    it('creates the correct number of groups of the correct size', () => {
      const sizeOptions = getGroupSizeOptions(students)
      
      sizeOptions.map(size => {
        const actual = Grouping.varied(students, size, 'rating')
        const arrayLength = Math.ceil(students.length / size)
        
        // asserts that there are the correct number of groups
        expect(actual).toHaveLength(arrayLength)
        // asserts that each group is the correct size
        // when user requests pairs, the expected group size will be 2 or 3
        // otherwise the expected group size will be equal to the specified size or one less
        actual.forEach(group => {
          if (size === 2) {
            expect(group.length === size || group.length === size + 1).toBe(true)
          } else {
            expect(group.length === size || group.length === size - 1).toBe(true)
          }
        })
      })
    });

    it('returns multidimensional array where students of each rating value are distributed across the arrays', () => {
      expect(Grouping.varied(students, 3, 'rating')).toEqual([
        [{ id: 1, rating: 3 }, { id: 6, rating: 1 }, { id: 5, rating: 2 }],
        [{ id: 3, rating: 3 }, { id: 7, rating: 1 }, { id: 8, rating: 2 }],
        [{ id: 10, rating: 3 }, { id: 11, rating: 1 }, { id: 9, rating: 2 },],
        [{ id: 14, rating: 3 }, { id: 13, rating: 1 }, { id: 12, rating: 2 }],
        [{ id: 2, rating: 1 }, { id: 4, rating: 2 } ]
      ])
    })
  });

  describe('getEvenGroups', () => {
    let students;
    let size;
    beforeEach(() => {
      students = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15]
      size = 3
    })

    it ('calls the lodash chunk method', () => {
      Grouping.getEvenGroups(size, students)

      expect(chunk.mock.calls).toHaveLength(1)
      expect(chunk.mock.calls[0][0]).toEqual(students)
      expect(chunk.mock.calls[0][1]).toBe(size)
    })
    
    it ('case 1: number of students is evenly divisible by group size', () => {
      expect(Grouping.getEvenGroups(size, students)).toEqual([
        [1, 2, 3], [4, 5, 6], [7, 8, 9], [10, 11, 12], [13, 14, 15]
      ])
    })

    it ('case 2: number of students divided by group size has remainder of size - 1', () => {
      size = 4

      expect(Grouping.getEvenGroups(size, students)).toEqual([
        [1, 2, 3, 4], [5, 6, 7, 8], [9, 10, 11, 12], [13, 14, 15]
      ])
    })

    it ('case 3: number of students divided by group size has remainder less than size - 1, but greater than 0', () => {
      size = 6
      
      expect(Grouping.getEvenGroups(size, students)).toEqual([
        [1, 2, 3, 4, 5], [7, 8, 9, 10, 11], [13, 14, 15, 6, 12]
      ])
    })

    it ('case 4: size - remainder is greater than the number of groups', () => {
      // returns a multidimensional array, but groups will not be even
      // in practice this situation cannot happen due to the getGroupSizeOptions function 
      size = 7

      expect(Grouping.getEvenGroups(size, students)).toEqual([
        [1, 2, 3, 4, 5, 6], [8, 9, 10, 11, 12, 13], [15, 7, 14]
      ])
    })

    it('returns groups of 2 and one group of 3 when user requests pairs with an odd number of students', () => {
      const size = 2
      const actual = Grouping.getEvenGroups(size, students)

      actual.forEach( (group, index) => {
        if (index === actual.length - 1) {
          expect(group).toHaveLength(size + 1)
        } else {
          expect(group).toHaveLength(size)
        }
      })
    })

    it('returns groups where the number of students in each group equals the size or one less', () => {
      const sizeOptions = getGroupSizeOptions(students)

      sizeOptions.map(size => {
        const actual = Grouping.getEvenGroups(size, students)

        // asserts that each group is the correct size
        // when user requests pairs, the expected group size will be 2 or 3 tested above
        // otherwise the expected group size will be equal to the specified size or one less
        actual.forEach(group => {
          if (size > 2) {
            expect(group.length === size || group.length === size - 1).toBe(true)
          }
        })
      })
    })
  })
});