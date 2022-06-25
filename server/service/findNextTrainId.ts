import { FastifyInstance } from "fastify";
import useCalendarCache from "$/service/useCalendarCache";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const findNextTrainId = async (
  trainId: string,
  fastify: FastifyInstance
): Promise<string | null> => {
  const isToei = ["K", "T"].includes(trainId.slice(-1));
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

  if (!operation) return null;

  const index = operation.trains.map(({ id }) => id).indexOf(trainId);

  if (index === operation.trains.length - 1) return null;

  const nextTrain = operation.trains[index + 1];

  console.log(nextTrain.id, nextTrain.depSta);

  if (
    nextTrain.depSta === "033" &&
    nextTrain.arrSta.slice(0, 1) === (isToei ? "0" : "1")
  ) {
    return nextTrain.id;
  }
  return null;
};

export default findNextTrainId;
