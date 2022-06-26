import firebaseAdmin from "$/service/firebaseAdmin";
import { UnitPost } from "$/types/unit";
import normalizeOperationId from "$/utils/notmalizeOperationId";
import { defineController, defineHooks } from "./$relay";
import { PrismaClient } from "@prisma/client";
import dayjs from "dayjs";

const prisma = new PrismaClient();

export type AdditionalRequest = {
  uid: string;
};

export const hooks = defineHooks(() => ({
  onRequest: async (req, reply) => {
    if (req.method === "POST") {
      const auth = firebaseAdmin.auth();
      const sessionId = req.cookies.session || "";
      const decodedClaims = await auth
        .verifySessionCookie(sessionId)
        .catch(() => null);
      if (decodedClaims) {
        req.uid = decodedClaims.uid;
      } else {
        reply.code(401);
        throw new Error();
      }
    }
  },
}));

export default defineController(() => ({
  post: async ({ body, uid }) => {
    const unitPosts = [...(Array.isArray(body) ? body : [body])];
    if (
      !unitPosts.every(({ unitId }) => /^\d{3,4}F(\+\d{3,4}F)?$/.test(unitId))
    )
      return { status: 400, body: "INVALID_UNIT_ID" };
    await prisma.unitPost.updateMany({
      where: {
        AND: {
          disabledAt: null,
          OR: unitPosts.map(({ operationId }) => ({
            operationId: { equals: operationId },
          })),
        },
      },
      data: {
        disabledAt: dayjs().format(),
      },
    });
    await prisma.unitPost.createMany({
      data: unitPosts.map(({ operationId, unitId }) => ({
        operationId: normalizeOperationId(operationId),
        unitId,
        uid,
      })),
    });
    return { status: 201 };
  },
  get: async () => {
    const unitPosts = await prisma.unitPost.findMany({
      select: {
        id: true,
        operationId: true,
        unitId: true,
        uid: true,
        createdAt: true,
        disabledAt: true,
      },
      orderBy: {
        id: "desc",
      },
    });
    return {
      status: 200,
      body: unitPosts.map<UnitPost>(
        ({ createdAt, disabledAt, ...unitPost }) => {
          return {
            ...unitPost,
            createdAt: dayjs(createdAt).format(),
            disabledAt: disabledAt ? dayjs(disabledAt).format() : null,
          };
        }
      ),
    };
  },
}));
