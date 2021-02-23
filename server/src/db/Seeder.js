import { connection } from "../boot.js";
import ClassSectionSeeder from "./seeders/ClassSectionSeeder.js";
import UserSeeder from "./seeders/UserSeeder.js";
import StudentSeeder from "./seeders/StudentSeeder.js";

class Seeder {
  static async seed() {
    console.log("seeding users...");
    await UserSeeder.seed();

    console.log("seeding classSections...");
    await ClassSectionSeeder.seed();

    console.log("seeding students...");
    await StudentSeeder.seed();

    console.log("done");
    await connection.destroy();
  }
}

export default Seeder;
