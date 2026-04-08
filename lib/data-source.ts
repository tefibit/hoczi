import "reflect-metadata";
import { DataSource } from "typeorm";
import { User } from "@/entities/User";

const AppDataSource = new DataSource({
  type: "postgres",
  url: process.env.DATABASE_URL,
  synchronize: process.env.NODE_ENV === "development",
  logging: process.env.NODE_ENV === "development",
  entities: [User],
  migrations: ["./migrations/*.ts"],
});

// Singleton: reuse the connection across hot reloads in development
declare global {
  // eslint-disable-next-line no-var
  var _dataSource: DataSource | undefined;
}

async function getDataSource(): Promise<DataSource> {
  if (global._dataSource?.isInitialized) {
    return global._dataSource;
  }
  console.log("DB RUN");
  

  await AppDataSource.initialize();
  global._dataSource = AppDataSource;
  return AppDataSource;
}

export { AppDataSource, getDataSource };
