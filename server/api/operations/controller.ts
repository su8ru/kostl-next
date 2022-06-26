import { Operation } from "$/types/operation";
import { defineController } from "./$relay";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default defineController(() => ({
  get: async () => {
    const allOperations = await prisma.operation.findMany({
      select: {
        id: true,
        day: true,
        trains: {
          select: {
            id: true,
            depTime: true,
            depSta: true,
            arrSta: true,
          },
          orderBy: {
            depTime: "asc",
          },
        },
      },
    });

    const groupedOperations = allOperations.reduce<{
      weekday: Operation[];
      holiday: Operation[];
    }>(
      (grouped, operation) =>
        Object.assign(grouped, {
          [operation.day.toLowerCase() as "weekday" | "holiday"]: [
            ...(grouped[operation.day.toLowerCase() as "weekday" | "holiday"] ||
              []),
            operation,
          ],
        }),
      { weekday: [], holiday: [] }
    );

    return {
      status: 200,
      body: groupedOperations,
    };
  },
}));
