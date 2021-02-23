import getGroupSizeOptions from "../../src/services/getGroupSizeOptions.js";

describe("src/services/getGroupSizeOptions.js", () => {
  it("case 1: when number of students is greater than 3", () => {
    const numStudents = 15;

    expect(getGroupSizeOptions(numStudents)).toEqual([2, 3, 4, 5, 8]);
  });

  it("case 2: when number of students is equal to 2", () => {
    const numStudents = 2;

    expect(getGroupSizeOptions(numStudents)).toEqual([2]);
  });
});
