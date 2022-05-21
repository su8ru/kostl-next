import { Operation } from "$/types/operation";

export type Methods = {
  get: {
    resBody: {
      weekday: Operation[];
      holiday: Operation[];
    };
  };
};
