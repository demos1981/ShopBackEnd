import { DataSource } from "typeorm";
import { Item } from "../models/itemEntity";
import { User } from "../models/userEntity";
import { CreateItemTable1742688060091 } from "../migrations/1742688060091-CreateItemTable";
import { CreateUser1680000000000 } from "../migrations/1680000000000-CreateUser";
import dotenv from "dotenv";

dotenv.config();

const isProduction = process.env.NODE_ENV === "production";

export const AppDataSource = new DataSource({
  type: "postgres",
  url: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false,
  },
  entities: [User, Item],
  migrations: [CreateItemTable1742688060091, CreateUser1680000000000],
  migrationsRun: true, // Automatically run migrations on startup
  synchronize: false, // Set to false in production
  logging: !isProduction,
});
