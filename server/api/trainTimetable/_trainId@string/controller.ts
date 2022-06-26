import { FastifyInstance } from "fastify";
import { defineController } from "./$relay";
import { API_ODPT_TOKEN } from "$/service/envValues";
import { TrainTimetable as ToeiTrainTimetable } from "$/types/toeiApi";
import { TrainTimetable as KeioTrainTimetable } from "$/types/keioApi";
import parseToei from "$/service/apiParser/trainTimetable/toei";
import parseKeio from "$/service/apiParser/trainTimetable/keio";
import findNextTrainId from "$/service/findNextTrainId";
import { TimetableRecord } from "$/types/trainTimetable";
import fetch from "node-fetch";
import { PrismaClient } from "@prisma/client";
import useCalendarCache from "$/service/useCalendarCache";
import { allKeioStationsJa, fullStationNameDict } from "$/service/data";

const prisma = new PrismaClient();

export default defineController((fastify) => ({
  get: async ({ params: { trainId } }) => {
    const { day } = await useCalendarCache(fastify);
    const isToei = ["K", "T"].includes(trainId.slice(-1));

    const trainTimetable: TimetableRecord[] = [];

    if (isToei) {
      trainTimetable.push(...(await getToeiTimetable(trainId, fastify)));
      const nextTrainId = await findNextTrainId(trainId, fastify);
      if (nextTrainId) {
        const [sjk, ...others] = await getKeioTimetable(nextTrainId);
        trainTimetable[trainTimetable.length - 1] = {
          ...trainTimetable[trainTimetable.length - 1],
          depTime: sjk.depTime,
        };
        trainTimetable.push(...others);
      }
    } else {
      const keioTimetable = await getKeioTimetable(trainId);

      const train = await prisma.train.findFirst({
        where: {
          id: trainId,
          day: day ?? undefined,
        },
        select: {
          depSta: true,
          depTime: true,
        },
      });

      if (
        train &&
        fullStationNameDict[train.depSta] !== keioTimetable[0].staName
      ) {
        const { depSta, depTime } = train;
        const staName = fullStationNameDict[depSta];
        trainTimetable.push({
          line: "keio",
          staId:
            staName === "京王線新宿"
              ? 1
              : allKeioStationsJa.indexOf(staName) + 1,
          staName,
          depTime: `${depTime.slice(0, 2)}:${depTime.slice(2, 4)}`,
        });
      }

      trainTimetable.push(...keioTimetable);
      const nextTrainId = await findNextTrainId(trainId, fastify);
      if (nextTrainId) {
        const [sjk, ...others] = await getToeiTimetable(nextTrainId, fastify);
        trainTimetable[trainTimetable.length - 1] = {
          ...trainTimetable[trainTimetable.length - 1],
          depTime: sjk.depTime,
        };
        trainTimetable.push(...others);
      }
    }

    return { status: 200, body: trainTimetable };
  },
}));

const getKeioTimetable = async (
  trainId: string
): Promise<TimetableRecord[]> => {
  const res = await fetch(`https://i.opentidkeio.jp/dia/${trainId}.json`);
  if (res.ok) {
    const { trainTimetable } = parseKeio(
      (await res.json()) as KeioTrainTimetable
    );
    return trainTimetable;
  }
  return [];
};

const getToeiTimetable = async (
  trainId: string,
  fastify: FastifyInstance
): Promise<TimetableRecord[]> => {
  const res = await fetch(
    `https://api.odpt.org/api/v4/odpt%3ATrainTimetable?odpt:railway=odpt.Railway:Toei.Shinjuku&odpt:trainNumber=${trainId}&acl:consumerKey=${API_ODPT_TOKEN}`
  );
  if (res.ok) {
    const { trainTimetable } = await parseToei(
      (await res.json()) as ToeiTrainTimetable[],
      fastify
    );
    return trainTimetable;
  }
  return [];
};
