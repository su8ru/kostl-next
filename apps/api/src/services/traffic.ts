import parseKeio from "../parsers/traffic/keio";
import parseToei from "../parsers/traffic/toei";
import { OperationDataProvider } from "../providers/operationDataProvider";
import { Body } from "@kostl/shared/types/keioApi";
import { Train as OdptTrain } from "@kostl/shared/types/toeiApi";
import { Traffic } from "@kostl/shared/types/train";

const unitDict: Record<string, string> = {};

export const fetchTraffic = async (
  key: "keio" | "toei",
  odptToken: string,
  operationDataProvider: OperationDataProvider,
  day: "WEEKDAY" | "HOLIDAY" | null
): Promise<{ fromKV: false } & Traffic> => {
  const operationDict = await operationDataProvider.getOperationMap(day);

  if (key === "keio") {
    const res = await fetch("https://i.opentidkeio.jp/data/traffic_info.json");
    if (!res.ok) throw new Error("Failed to fetch Keio traffic");
    return {
      fromKV: false,
      ...parseKeio((await res.json()) as Body, operationDict, unitDict),
    };
  }

  const url = new URL("https://api.odpt.org/api/v4/odpt:Train");
  url.searchParams.set("odpt:railway", "odpt.Railway:Toei.Shinjuku");
  url.searchParams.set("acl:consumerKey", odptToken);
  const res = await fetch(url.toString());
  if (!res.ok) throw new Error("Failed to fetch Toei traffic");
  return {
    fromKV: false,
    ...(await parseToei(
      (await res.json()) as OdptTrain[],
      operationDict,
      unitDict
    )),
  };
};
