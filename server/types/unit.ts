export type UnitPost = {
  id: number;
  operationId: string;
  unitId: string;
  uid: string;
  createdAt: string;
  disabledAt: string | null;
};

export type UnitPostBody = Pick<UnitPost, "operationId" | "unitId">;
