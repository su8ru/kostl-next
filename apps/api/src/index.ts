import { Env } from "./env";
import { emptyOperationDataProvider } from "./providers/operationDataProvider";
import { getCachedJson } from "./services/cache";
import { fetchCalendar } from "./services/calendar";
import { fetchTraffic } from "./services/traffic";
import { fetchTrainTimetable } from "./services/trainTimetable";
import { Hono } from "hono";
import { cors } from "hono/cors";

const app = new Hono<Env>()
  .use(
    "/api/*",
    cors({
      origin: (origin, c) =>
        origin === c.env.CLIENT_ORIGIN ? origin : c.env.CLIENT_ORIGIN,
    })
  )
  .get("/api/health", (c) => c.json({ ok: true }))
  .get("/api/calendar", async (c) =>
    getCachedJson(c.req.raw, () => fetchCalendar(c.env.API_ODPT_TOKEN), 60 * 60)
  )
  .get("/api/traffic/:key", async (c) => {
    const key = c.req.param("key");
    if (key !== "keio" && key !== "toei") {
      return c.json({ message: "Invalid traffic key" }, 400);
    }

    const calendar = await fetchCalendar(c.env.API_ODPT_TOKEN);
    return getCachedJson(
      c.req.raw,
      () =>
        fetchTraffic(
          key,
          c.env.API_ODPT_TOKEN,
          emptyOperationDataProvider,
          calendar.day
        ),
      5
    );
  })
  .get("/api/trainTimetable/:trainId", async (c) => {
    const calendar = await fetchCalendar(c.env.API_ODPT_TOKEN);
    return c.json(
      await fetchTrainTimetable(
        c.req.param("trainId"),
        calendar.day,
        c.env.API_ODPT_TOKEN
      )
    );
  });

export type AppType = typeof app;

export default app;
