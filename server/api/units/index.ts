import { UnitPost, UnitPostBody } from "$/types/unit";

export type Methods = {
  post: {
    reqBody: UnitPostBody | UnitPostBody[];
  };
  get: {
    resBody: UnitPost[];
  };
};
