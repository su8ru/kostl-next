export type OperationDataProvider = {
  getOperationMap: (
    day: "WEEKDAY" | "HOLIDAY" | null
  ) => Promise<Record<string, { operationId: string }>>;
};

export const emptyOperationDataProvider: OperationDataProvider = {
  getOperationMap: async () => ({}),
};
