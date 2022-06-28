import { FastifyInstance } from "fastify";
import useCalendarCache from "$/service/useCalendarCache";
import { TrainWithInfo } from "$/types/operation";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const findNextTrain = async (
  trainId: string,
  fastify: FastifyInstance
): Promise<Pick<TrainWithInfo, "id" | "depSta" | "arrSta"> | null> => {
  const { day } = await useCalendarCache(fastify);

  const train = await prisma.train.findFirst({
    where: {
      id: trainId,
      day: day ?? undefined,
    },
    select: {
      operationId: true,
    },
  });

  if (!train) return null;

  const operation = await prisma.operation.findFirst({
    where: {
      id: train.operationId,
      day: day ?? undefined,
    },
    select: {
      trains: {
        select: {
          id: true,
          depSta: true,
          arrSta: true,
        },
        orderBy: {
          depTime: "asc",
        },
      },
    },
  });

  if (!operation) return null;

  const index = operation.trains.map(({ id }) => id).indexOf(trainId);

  if (index === operation.trains.length - 1) return null;

  const currTrain = operation.trains[index];
  const nextTrain = operation.trains[index + 1];

  if (
    nextTrain.depSta === currTrain.arrSta &&
    parseInt(trainId) % 2 === parseInt(nextTrain.id) % 2
  ) {
    return nextTrain;
  }
  return null;
};

export default findNextTrain;
