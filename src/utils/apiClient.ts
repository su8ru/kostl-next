import api from "$/api/$api";
import aspida from "@aspida/fetch";

export const apiClient = api(
  aspida(undefined, { throwHttpErrors: true, credentials: "include" })
);
