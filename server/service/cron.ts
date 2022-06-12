import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const clearUnitPosts = async () => {
  console.log(`Cron: Start deleting all unit posts...`);
  const deletedPosts = await prisma.unitPost.deleteMany({});
  console.log(`Cron: Deleted all unit posts (${deletedPosts.count} rows)`);
};
