export type Env = {
  Bindings: {
    API_ODPT_TOKEN: string;
    CLIENT_ORIGIN: string;
  };
};

export type CalendarDay = "WEEKDAY" | "HOLIDAY" | null;

export type CalendarResponse = {
  date: string;
  day: CalendarDay;
};
