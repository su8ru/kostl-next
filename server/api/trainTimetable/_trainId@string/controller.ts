import { defineController } from "./$relay";
import { API_ODPT_TOKEN } from "$/service/envValues";
import { TrainTimetable as ToeiTrainTimetable } from "$/types/toeiApi";
import { TrainTimetable as KeioTrainTimetable } from "$/types/keioApi";
import parseToei from "$/service/apiParser/trainTimetable/toei";
import parseKeio from "$/service/apiParser/trainTimetable/keio";
import { TimetableRecord } from "$/types/trainTimetable";
import fetch from "node-fetch";

export default defineController((fastify) => ({
  get: async ({ params: { trainId } }) => {
    const isToei = ["K", "T"].includes(trainId.slice(-1));

    const trainTimetable: TimetableRecord[] = [];

    if (isToei) {
      const res = await fetch(
        `https://api.odpt.org/api/v4/odpt%3ATrainTimetable?odpt:railway=odpt.Railway:Toei.Shinjuku&odpt:trainNumber=${trainId}&acl:consumerKey=${API_ODPT_TOKEN}`
      );
      if (res.ok)
        trainTimetable.push(
          ...(
            await parseToei((await res.json()) as ToeiTrainTimetable[], fastify)
          ).trainTimetable
        );
    } else {
      const res = await fetch(`https://i.opentidkeio.jp/dia/${trainId}.json`);
      if (res.ok)
        trainTimetable.push(
          ...parseKeio((await res.json()) as KeioTrainTimetable).trainTimetable
        );
    }

    return { status: 200, body: trainTimetable };
  },
}));
