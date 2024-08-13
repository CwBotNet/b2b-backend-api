import { PrismaClient } from "@prisma/client";
import { db, DB_NAME } from "../constants";

// Db connection function

const prisma = new PrismaClient();

const ConnectDb = async () => {
  try {
    // Test the connection by querying the database
    const connectionInstance = await prisma.$connect();
    console.log(`\nMongoDB connection established!`);
  } catch (error) {
    console.log(`Db Connection error :${error}`);
    process.exit(1);
  }
};

export default ConnectDb;
