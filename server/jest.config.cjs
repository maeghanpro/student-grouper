module.exports = {
  coverageDirectory: "coverage",
  setupFiles: ["./__tests__/testHelper.js"],
  testPathIgnorePatterns: ["<rootDir>/__tests__/testHelper.js", "<rootDir>/src/boot/environments/test.js"],
  moduleFileExtensions: ["js", "json", "mjs", "node"],
  transform: {
    "^.+\\.c?[t|j]sx?$": "babel-jest"
  }
};
