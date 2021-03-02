const defaultDatabaseUrls = {
  development: "postgres://postgres:postgres@localhost:5432/student-grouper_development",
  test: "postgres://postgres:postgres@localhost:5432/student-grouper_test",
  e2e: "postgres://postgres:postgres@localhost:5432/student-grouper_e2e",
};
const getDatabaseUrl = (nodeEnv) => process.env.DATABASE_URL || defaultDatabaseUrls[nodeEnv];

module.exports = getDatabaseUrl;
