const getDatabaseUrl = (nodeEnv) =>
  ({
    development: "postgres://postgres:postgres@localhost:5432/student-grouper_development",
    test: "postgres://postgres:postgres@localhost:5432/student-grouper_test",
    e2e: "postgres://postgres:postgres@localhost:5432/student-grouper_e2e",
  }[nodeEnv] || process.env.DATABASE_URL);

module.exports = getDatabaseUrl;
