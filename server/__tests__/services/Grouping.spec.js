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
        // otherwise the expected group size will be equal to or one greater
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
});