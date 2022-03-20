import aspida from "@aspida/fetch";
import api from "$/api/$api";
import trafficApi from "~/traffic-api/$api";

export const apiClient = api(aspida(undefined, { throwHttpErrors: true }));
export const trafficApiClient = trafficApi(aspida());
