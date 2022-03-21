import { defineController } from "./$relay";
import cacheHandler from "$/service/cacheHandler";
import { API_ODPT_TOKEN } from "$/service/envValues";

const apiUrl = {
  keio: "https://i.opentidkeio.jp/data/traffic_info.json",
  toei: `https://api.odpt.org/api/v4/odpt%3ATrain?odpt:railway=odpt.Railway:Toei.Shinjuku&acl:consumerKey=${API_ODPT_TOKEN}`,
};

export default defineController((fastify) => ({
  get: async ({ params: { key } }) => {
    if (key !== "keio" && key !== "toei") return { status: 400 };
    const data = await cacheHandler(fastify, key, apiUrl[key]);
    return { status: 200, body: data };
  },
}));
