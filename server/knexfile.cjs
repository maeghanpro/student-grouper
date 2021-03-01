const path = require("path");
const getDatabaseUrl = require("./src/config/getDatabaseUrl.cjs");

const migrationPath = "src/db/migrations";
f
module.exports = {
  // connection: getDatabaseUrl(process.env.NODE_ENV || "development"),
  connection: {
    user: 'postgres', //env var: PGUSER
    database: 'postgres', //env var: PGDATABASE
    password: 'postgres', //env var: PGPASSWORD
    host: 'postgres', // Server hosting the postgres database
    port: 5432, //env var: PGPORT
  }
  client: "pg",
  migrations: {
    directory: migrationPath,
    extension: "cjs",
    stub: path.join(migrationPath, "migration.stub.cjs"),
  },
};
