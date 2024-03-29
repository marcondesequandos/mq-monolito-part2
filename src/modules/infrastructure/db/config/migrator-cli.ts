import { join } from "path";
import { Sequelize } from "sequelize";
import { migrator } from "./migrator";

const sequelize = new Sequelize({
  dialect: "sqlite",
  // storage: "./db.sqlite",
  storage: join(__dirname, "../../../database.sqlite"),
  logging: true,
});

migrator(sequelize).runAsCLI();

// fazer config para conectar no DB, trazer mysql docker
