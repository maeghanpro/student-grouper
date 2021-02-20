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
    jest.resetAllMocks();
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
      expect(shuffle).toHaveBeenCalledTimes(3)
      expect(shuffle).toHaveBeenCalledWith([{ id: 1, rating: 3 },
        { id: 3, rating: 3 }])
      expect(shuffle).toHaveBeenCalledWith([{ id: 4, rating: 2 },
        { id: 5, rating: 2 }])
      expect(shuffle).toHaveBeenCalledWith([{ id: 2, rating: 1 },
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
      Grouping.getEvenGroups(students, size)

      expect(chunk).toHaveBeenCalledTimes(1)
      expect(chunk).toHaveBeenCalledWith(students, size)
    })
    
    it ('case 1: number of students is evenly divisible by group size', () => {
      expect(Grouping.getEvenGroups(students, size)).toEqual([
        [1, 2, 3], [4, 5, 6], [7, 8, 9], [10, 11, 12], [13, 14, 15]
      ])
    })

    it ('case 2: number of students divided by group size has remainder of size - 1', () => {
      size = 4

      expect(Grouping.getEvenGroups(students, size)).toEqual([
        [1, 2, 3, 4], [5, 6, 7, 8], [9, 10, 11, 12], [13, 14, 15]
      ])
    })

    it ('case 3: number of students divided by group size has remainder less than size - 1, but greater than 0', () => {
      size = 6
      
      expect(Grouping.getEvenGroups(students, size)).toEqual([
        [1, 2, 3, 4, 5], [7, 8, 9, 10, 11], [13, 14, 15, 6, 12]
      ])
    })

    it ('case 4: size - remainder is greater than the number of groups', () => {
      // returns a multidimensional array, but groups will not be even
      // in practice this situation cannot happen due to the getGroupSizeOptions function 
      size = 7

      expect(Grouping.getEvenGroups(students, size)).toEqual([
        [1, 2, 3, 4, 5, 6], [8, 9, 10, 11, 12, 13], [15, 7, 14]
      ])
    })

    it('returns groups of 2 and one group of 3 when user requests pairs with an odd number of students', () => {
      const size = 2
      const actual = Grouping.getEvenGroups(students, size)

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
        const actual = Grouping.getEvenGroups(students, size)

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

  describe('random', () => {
    it ('calls shuffle method and getEvenGroups to make random groups of given size', () => {
      const students = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15]
      const size = 3 
      
      expect(Grouping.random(students, size)).toEqual([
        [1, 2, 3], [4, 5, 6], [7, 8, 9], [10, 11, 12], [13, 14, 15]
      ])
      expect(shuffle).toHaveBeenCalledTimes(1)
      expect(shuffle).toHaveBeenCalledWith(students)
    })
  })

  describe('similar', () => {
    it ('calls shuffle method, sorts students by rating value, and calls getEvenGroups to make groups of similar rating value', () => {
      const students = [
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
      const size = 4

      expect(Grouping.similar(students, size, 'rating')).toEqual([
        [{ id: 2, rating: 1 }, { id: 6, rating: 1 }, { id: 7, rating: 1 }, { id: 11, rating: 1 }],
        [{ id: 13, rating: 1 }, { id: 4, rating: 2 }, { id: 5, rating: 2 }, { id: 8, rating: 2 }],
        [{ id: 9, rating: 2 }, { id: 12, rating: 2 }, { id: 1, rating: 3 }],
        [{ id: 10, rating: 3 }, { id: 14, rating: 3 }, { id: 3, rating: 3 }]
      ])
      expect(shuffle).toHaveBeenCalledTimes(1)
      expect(shuffle).toHaveBeenCalledWith(students)
    })
  })

  describe('generate', () => {
    let students;
    let size;
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

      size = 4
    })

    it('case 1: when type is random, the random method is called', () => {
      const arrangement = { type: 'random', groupSize: size}

      expect(Grouping.generate(students, arrangement)).toEqual([
        [
          { id: 1, rating: 3 }, 
          { id: 2, rating: 1 }, 
          { id: 3, rating: 3 },
          { id: 4, rating: 2 }
        ],
        [
          { id: 5, rating: 2 },
          { id: 6, rating: 1 },
          { id: 7, rating: 1 },
          { id: 8, rating: 2 }
        ],
        [
          { id: 9, rating: 2 },
          { id: 10, rating: 3 },
          { id: 11, rating: 1 }
        ],
        [
          { id: 13, rating: 1 },
          { id: 14, rating: 3 },
          { id: 12, rating: 2 }
        ]
      ])
    })

    it('case 2: when type is similar, the similar method is called', () => {
      const arrangement = { type: 'similar rating', groupSize: size}

      expect(Grouping.generate(students, arrangement)).toEqual([
        [
          { id: 2, rating: 1 }, 
          { id: 6, rating: 1 }, 
          { id: 7, rating: 1 }, 
          { id: 11, rating: 1 }
        ],
        [
          { id: 13, rating: 1 }, 
          { id: 4, rating: 2 }, 
          { id: 5, rating: 2 }, 
          { id: 8, rating: 2 }
        ],
        [
          { id: 9, rating: 2 }, 
          { id: 12, rating: 2 }, 
          { id: 1, rating: 3 }
        ],
        [
          { id: 10, rating: 3 }, 
          { id: 14, rating: 3 }, 
          { id: 3, rating: 3 }
        ]
      ])
    })

    it('case 3: when type is varied, the varied method is called', () => {
      const arrangement = { type: 'varied rating', groupSize: size}

      expect(Grouping.generate(students, arrangement)).toEqual([
        [
          { id: 1, rating: 3 },
          { id: 2, rating: 1 },
          { id: 13, rating: 1 },
          { id: 9, rating: 2 }
        ],
        [
          { id: 3, rating: 3 },
          { id: 6, rating: 1 },
          { id: 4, rating: 2 },
          { id: 12, rating: 2 }
        ],
        [
          { id: 10, rating: 3 },
          { id: 7, rating: 1 },
          { id: 5, rating: 2 },
        ],
        [
          { id: 14, rating: 3 },
          { id: 11, rating: 1 },
          { id: 8, rating: 2 }
        ]
      ])
    })
  })
});