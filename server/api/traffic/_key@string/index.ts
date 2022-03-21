import { Traffic } from "$/types/train";

export type Methods = {
  get: {
    resBody: {
      fromKV: boolean;
    } & Traffic;
  };
};
